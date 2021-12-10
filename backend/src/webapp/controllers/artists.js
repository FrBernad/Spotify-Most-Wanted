const { response } = require('express');
const express = require('express');
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

/* GET users listing. */
router.get('/', async function (req, res, next) {
    results = await searchService.getMostPopularSongsByArtist();

    if (!results) {
        res.sendStatus(400);
    }

    res.send(results);
});

module.exports = router;

