const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Spotify-Most-Wanted API',
            version: '1.0.0',
            description: 'This is a REST API application made with Express. It retrieves data from Json'
        },
        servers: [
            {
                url: process.env.BASE_URL + "/api"
            }
        ]
    },
    apis: ['./src/webapp/swagger/swagger_definitions.js']
};

const specs = swaggerJsDoc(swaggerOptions);

module.exports = specs
