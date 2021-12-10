const express = require('express');
const router = express.Router();
let mongoDriver;
let neoDriver;
require("@persistence/drivers/mongo_driver")().then(driver => mongoDriver = driver);
require("@persistence/drivers/neo_driver")().then(driver => neoDriver = driver);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const query = { title: "betrayed" };
    const options = {
      projection: { _id: 0, title: 1 },
    };
    const song = await mongoDriver.getSongsCollection().findOne(query, options);
    res.send(song);
  } catch (error) {
    next(error);
  }
});

router.get('/neo', async function (req, res, next) {
  try {
    const artists = await neoDriver.executeQuery('MATCH (n:Artist) RETURN n LIMIT 25');
    res.send(artists);
  } catch (error) {
  }
});

module.exports = router;

