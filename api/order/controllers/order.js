'use strict';
const stripe = require('stripe')(process.env.STRIPE_KEY);
const {sanitizeEntity} = require('strapi-utils');
const orderTemplate = require('../../../config/email-templates/order');

module.exports = {
  createPaymentIntent: async (ctx) => {
    const { cart} = ctx.request.body;

    const cartGamesIds = await strapi.config.functions.cart.cartGamesIds(cart);

    //get all games
    const games = await strapi.config.functions.cart.cartItems(cartGamesIds);

    if (!games.length) {
      ctx.response.status = 404;

      return {
        error: "No valid games found!",
      };
    }

    const total = await strapi.config.functions.cart.total(games);

    if (total === 0 ) {
      return {
        freeGames: true,
      }
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        metadata: {cart: JSON.stringify(cartGamesIds)},
      });

      return paymentIntent;

    } catch (error) {

    return {
      error: error.raw.message,
    }

    }

  },
  create: async (ctx) => {
    //pegar informaçoes do client
    //paymentIntentId info do pagamento (paymentMethod)
    const {cart, paymentIntentId, paymentMethod } = ctx.request.body

    const cartGamesIds = await strapi.config.functions.cart.cartGamesIds(cart);

    //pega o token
    const token = await strapi.plugins["users-permissions"].services.jwt.getToken(ctx);

    //pega o id do usuario
    const userId = token.id;

    //pega as informações do usuario
    const userInfo = await strapi
    .query("user","users-permissions")
    .findOne({ id: userId });

    //pegar os jogos e o total
      const games = await strapi.config.functions.cart.cartItems(cartGamesIds);
      const total_in_cents = await strapi.config.functions.cart.total(games);

    //pegar valores do paymentMethod
    let paymentInfo;

    if(total_in_cents !== 0 ) {
      try {
        paymentInfo = await stripe.paymentMethods.retrieve(paymentMethod);
      } catch (error) {
        ctx.response.status = 402;
        return { error : error.message }
      }
    }

      const entry = {
        total_in_cents,
        payment_intent_id: paymentIntentId,
        card_brand: paymentInfo?.card?.brand,
        card_last4: paymentInfo?.card?.last4,
        user: userInfo,
        games,
      };

      const entity = await strapi.services.order.create(entry);

      //enviar um email da compra para o usuario
      await strapi.plugins.email.services.email.sendTemplatedEmail(
        {
          to: userInfo.email,
          from: "no-reply@wongames.com",
        },
        orderTemplate,
        {
          user: userInfo,
          payment: {
            total: `$ ${total_in_cents / 100}`,
            card_brand: entry.card_brand,
            card_last4: entry.card_last4,
          },
          games,
        }
      );

      return sanitizeEntity(entity, { model: strapi.models.order});
  }

};
