const express = require('express');
const {getOrDefault, createPaginationResponse} = require("@webapp/utils/request_utils");
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

const _DEFAULT_PAGE = "0";
const _DEFAULT_ITEMS_PER_PAGE = "5";

/* GET songs listing. */
router.get('/', async function (req, res, next) {
    const queryParams = req.query;

    const page = getOrDefault(queryParams.page, _DEFAULT_PAGE);
    const itemsPerPage = getOrDefault(queryParams.itemsPerPage, _DEFAULT_ITEMS_PER_PAGE);
    const artist = getOrDefault(queryParams.artist, "");
    const country = getOrDefault(queryParams.country, "");
    const genre = getOrDefault(queryParams.genre, "");
    let results;

    try {
        results = await searchService.getMostPopularSongs(artist, country, genre, page, itemsPerPage);
    } catch (e) {
        res.sendStatus(parseInt(e.message));
        return;
    }

    const searchParams = new URLSearchParams();
    if (!!artist) {
        searchParams.append("artist", artist)
    }
    if (!!country) {
        searchParams.append("country", country)
    }
    if (!!genre) {
        searchParams.append("genre", genre)
    }

    createPaginationResponse(req, res, searchParams, results);

});

router.get('/genres', async function (req, res, next) {

    let results;

    try {
        results = await searchService.getGetAllGenres();
    } catch (e) {
        res.sendStatus(parseInt(e.message));
        return;
    }

    res.send(results);
});


module.exports = router;

