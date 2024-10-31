const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de TeddyShop',
        version: '1.0.0',
        description: 'Documentación de la API de peluches.oso',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
        },
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = {
    swaggerUi,
    swaggerSpec,
};