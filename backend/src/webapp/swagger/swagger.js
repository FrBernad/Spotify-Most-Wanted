const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('@webapp/swagger/swagger_conf');
const router = express.Router();

router.use("/", swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));

module.exports = router;

