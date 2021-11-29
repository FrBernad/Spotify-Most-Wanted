const express = require('express');
const router = express.Router();
let mongoDriver;
require("../persistance/mongo_driver")().then(driver => mongoDriver = driver);

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
module.exports = router;

