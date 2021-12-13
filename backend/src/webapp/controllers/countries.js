const express = require('express');
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

router.get('/', async function (req, res, next) {

    let results;

    try {
        results = await searchService.getAllCountries();
    } catch (e) {
        res.sendStatus(parseInt(e.message));
        return;
    }

    res.send(results);

});

module.exports = router;

