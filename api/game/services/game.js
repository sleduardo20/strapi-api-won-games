'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const axios = require("axios");

async function getGameInfo(slug){
  const jsdom = require("jsdom");

  const {JSDOM} = jsdom;

  const response = await axios.get(`https://www.gog.com/game/${slug}`);

  const dom = new JSDOM(response.data);

  const description = dom.window.document.querySelector('.description');

  return {
    rating: 'Free',
    short_description: description.textContent.trim().slice(0,160),
    description: description.innerHTML,
  }
}

 module.exports = {
  populate: async (params) => {
   const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`

   const {data: {products} } = await axios.get(gogApiUrl);

   console.log(products[6]);

   console.log(await getGameInfo(products[13].slug));
  }
};

