const cartGamesIds = async (cart) => {
  return await cart.map( (game) => ({
    id: game.id,
  }))
};

const cartItems = async ( cart ) => {
  let games = [];

  await Promise.all(
    cart?.map( async (game) => {
      const validatedGame = await strapi.services.game.findOne({
        id: game.id
      })

      if(validatedGame) {
        games.push(validatedGame);
      }
    })
  );

  return games;

};

const total = async ( games ) => {

  const ammout = await games.reduce((acc, game) => {
    return acc + game.price;
  }, 0);

  return Number((ammout * 100).toFixed(0));
};


module.exports = {
  cartItems,
  total,
  cartGamesIds
}
