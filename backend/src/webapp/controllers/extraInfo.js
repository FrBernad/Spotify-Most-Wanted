const express = require('express');
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

router.get('/', async function(req, res, next) {


    const results = await searchService.getAllCountries();

    if (!results) {
        res.sendStatus(400);
    }

    res.send(results);

  });

module.exports = router;

