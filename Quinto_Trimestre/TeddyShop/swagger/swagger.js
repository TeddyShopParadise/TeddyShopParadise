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
            url: 'http://localhost:3000', // Cambia esto a la URL de tu servidor
        },
    ],
    tags: [
        {
            name: 'Administradores',
            description: 'Operaciones relacionadas con los Administradores'
        },
        {
            name: 'Catálogos',
            description: 'Operaciones relacionadas con los Catálogos'
        }, 
        {
            name: 'Categorías',
            description: 'Operaciones relacionadas con los Categorías'
        }, 
        {
            name: 'Cliente',
            description: 'Operaciones relacionadas con los Detalles de los Clientes'
        }, 
        {
            name: 'Compañía',
            description: 'Operaciones relacionadas con la compañia'
        }, 
        {
            name: 'Detalle Factura',
            description: 'Operaciones relacionadas con los Detalles de las facturas'
        }, 
        {
            name: 'Detalle Pedido',
            description: 'Operaciones relacionadas con los Detalles de los pedidos'
        }, 
        {
            name: 'Devoluciones',
            description: 'Operaciones relacionadas con las devoluciones'
        }, 
        {
            name: 'Empleados',
            description: 'Operaciones relacionadas con los empleados'
        }, 
        {
            name: 'Facturas',
            description: 'Operaciones relacionadas con las Facturas'
        }, 
        {
            name: 'Historial de Precios',
            description: 'Operaciones relacionadas con los historiales de precio'
        }, 
        {
            name: 'Métodos de Pago',
            description: 'Operaciones relacionadas con los métodos de pago'
        }, 
        {
            name: 'Movimientos',
            description: 'Operaciones relacionadas con los movimientos'
        }, 
        {
            name: 'Pedidos',
            description: 'Operaciones relacionadas con los pedidos'
        }, 
        {
            name: 'Productos',
            description: 'Operaciones relacionadas con los productos'
        }, 
        {
            name: 'Roles',
            description: 'Operaciones relacionadas con los Roles'
        }, 
        {
            name: 'Usuarios',
            description: 'Operaciones relacionadas con los Usuarios'
        },
        {
            name: 'Vendedores',
            description: 'Operaciones relacionadas con los Vendedores'
        }, 


        // Puedes definir otros tags aquí si tienes más grupos de endpoints
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Ruta a los archivos que contienen anotaciones de Swagger
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = {
    swaggerUi,
    swaggerSpec,
};