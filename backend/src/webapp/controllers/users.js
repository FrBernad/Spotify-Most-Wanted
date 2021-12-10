const express = require('express');
const router = express.Router();
let searchService;
require("@services/search_service")().then(service => searchService = service);

// /* GET users listing. */
// router.get('/', async function (req, res, next) {
//   try {
//     const query = { title: "betrayed" };
//     const options = {
//       projection: { _id: 0, title: 1 },
//     };
//     const song = await mongoDriver.getSongsCollection().findOne(query, options);
//     res.send(song);
//   } catch (error) {
//     next(error);
//   }
// });

router.get('/neo', async function (req, res, next) {
  try {
    const artists = await searchService.getArtists();
    res.send(artists);
  } catch (error) {
    console.log(error)
    next(error);
  }
});

module.exports = router;

