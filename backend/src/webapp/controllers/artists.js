const { response } = require('express');
const express = require('express');
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

/* GET users listing. */
router.get('/', async function (req, res, next) {
    results = await searchService.getMostPopularSongsByArtist("Lil Xan", 0, 5);
    if (!results) {
        res.sendStatus(400);
        return;
    }

    res.send(results);
});

module.exports = router;

