const express = require('express');
const router = express.Router();
const {getOrDefault, createPaginationResponse} = require("@webapp/utils/request_utils");
let searchService;
require("@services/search_service")().then(service => searchService = service);

const _DEFAULT_PAGE = "0";
const _DEFAULT_ITEMS_PER_PAGE = "5";


router.get('/', async function (req, res, next) {
    const queryParams = req.query;

    const page = getOrDefault(queryParams.page, _DEFAULT_PAGE);
    const itemsPerPage = getOrDefault(queryParams.itemsPerPage, _DEFAULT_ITEMS_PER_PAGE);
    const artist = getOrDefault(queryParams.artist, "");
    const country = getOrDefault(queryParams.country, "");
    const genre = getOrDefault(queryParams.genre, "");

    let results;

    try {
        results = await searchService.getMostPopularAlbums(artist,country, genre, page, itemsPerPage);
    } catch (e) {
        console.log(e)
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

module.exports = router;

