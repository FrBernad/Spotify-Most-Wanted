const express = require('express');
const {getOrDefault, createPaginationResponse} = require("@webapp/utils/request_utils");
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

const _DEFAULT_PAGE = "0";
const _DEFAULT_ITEMS_PER_PAGE = "5";


router.get('/', async function (req, res, next) {
    const queryParams = req.query;

    const page = getOrDefault(queryParams.page, _DEFAULT_PAGE);
    const itemsPerPage = getOrDefault(queryParams.itemsPerPage, _DEFAULT_ITEMS_PER_PAGE);
    const country = getOrDefault(queryParams.country, "");
    const genre = getOrDefault(queryParams.genre, "");

    let results;

    try {
        results = await searchService.getMostPopularArtists(country, genre, page, itemsPerPage);
    } catch (e) {
        res.sendStatus(parseInt(e.message));
        return;
    }

    const searchParams = new URLSearchParams();

    if (!!country) {
        searchParams.append("country", country)
    }
    if (!!genre) {
        searchParams.append("genre", genre)
    }

    createPaginationResponse(req, res, searchParams, results);

});

  router.get('/getArtistsCollab',async function(req, res, next){
      const queryParams = req.query;

      const page = getOrDefault(queryParams.page, _DEFAULT_PAGE);
      const itemsPerPage = getOrDefault(queryParams.itemsPerPage, _DEFAULT_ITEMS_PER_PAGE);
      const artist = queryParams.artists;
      const results = await searchService.getArtitstCollab(queryParams.artist,page,itemsPerPage);
      console.log(results);
      if(!results){
          res.sendStatus(400);
          return;
      }

      const searchParams = new URLSearchParams();

      if(!!artist){
          searchParams.append(artist);
      }

      createPaginationResponse(req, res,searchParams,results);
  });
module.exports = router;

