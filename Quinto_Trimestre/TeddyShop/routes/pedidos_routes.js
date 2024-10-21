const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/pedido_controller');

/**
 * @swagger
 * tags:
 *   name: Pedido
 *   description: API para gestionar pedidos
 */

/**
 * @swagger
 * path:
 *   /pedidos:
 *     get:
 *       tags: [Pedido]
 *       summary: Listar todos los pedidos
 *       responses:
 *         200:
 *           description: Lista de pedidos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tamañoOso:
 *                       type: string
 *                     nombreComprador:
 *                       type: string
 *                     numeroComprador:
 *                       type: string
 *                     nombreAgendador:
 *                       type: string
 *                     numeroAgendador:
 *                       type: string
 *                     localidad:
 *                       type: string
 *                     direccion:
 *                       type: string
 *                     barrio:
 *                       type: string
 *                     cliente:
 *                       type: string
 *                       format: objectId
 *                     apellidoAgendador:
 *                       type: string
 *                     apellidoComprador:
 *                       type: string
 *                     detallesPedido:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *                     facturas:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *                     vendedores:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/pedidos', pedidoController.listarPedidos);

/**
 * @swagger
 * path:
 *   /pedidos:
 *     post:
 *       tags: [Pedido]
 *       summary: Crear un nuevo pedido
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tamañoOso:
 *                   type: string
 *                   required: true
 *                 nombreComprador:
 *                   type: string
 *                   required: true
 *                 numeroComprador:
 *                   type: string
 *                   required: true
 *                 nombreAgendador:
 *                   type: string
 *                   required: true
 *                 numeroAgendador:
 *                   type: string
 *                   required: true
 *                 localidad:
 *                   type: string
 *                   required: true
 *                 direccion:
 *                   type: string
 *                   required: true
 *                 barrio:
 *                   type: string
 *                   required: true
 *                 cliente:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *                 apellidoAgendador:
 *                   type: string
 *                 apellidoComprador:
 *                   type: string
 *                 detallesPedido:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 facturas:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 vendedores:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         201:
 *           description: Pedido creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tamañoOso:
 *                     type: string
 *                   nombreComprador:
 *                     type: string
 *                   numeroComprador:
 *                     type: string
 *                   nombreAgendador:
 *                     type: string
 *                   numeroAgendador:
 *                     type: string
 *                   localidad:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   barrio:
 *                     type: string
 *                   cliente:
 *                     type: string
 *                     format: objectId
 *                   apellidoAgendador:
 *                     type: string
 *                   apellidoComprador:
 *                     type: string
 *                   detallesPedido:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   facturas:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   vendedores:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/pedidos', pedidoController.crearPedido);

/**
 * @swagger
 * path:
 *   /pedidos/{id}:
 *     get:
 *       tags: [Pedido]
 *       summary: Obtener un pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del pedido a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Pedido encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tamañoOso:
 *                     type: string
 *                   nombreComprador:
 *                     type: string
 *                   numeroComprador:
 *                     type: string
 *                   nombreAgendador:
 *                     type: string
 *                   numeroAgendador:
 *                     type: string
 *                   localidad:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   barrio:
 *                     type: string
 *                   cliente:
 *                     type: string
 *                     format: objectId
 *                   apellidoAgendador:
 *                     type: string
 *                   apellidoComprador:
 *                     type: string
 *                   detallesPedido:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   facturas:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   vendedores:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         404:
 *           description: Pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/pedidos/:id', pedidoController.obtenerPedidoPorId);

/**
 * @swagger
 * path:
 *   /pedidos/{id}:
 *     put:
 *       tags: [Pedido]
 *       summary: Actualizar un pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del pedido a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tamañoOso:
 *                   type: string
 *                 nombreComprador:
 *                   type: string
 *                 numeroComprador:
 *                   type: string
 *                 nombreAgendador:
 *                   type: string
 *                 numeroAgendador:
 *                   type: string
 *                 localidad:
 *                   type: string
 *                 direccion:
 *                   type: string
 *                 barrio:
 *                   type: string
 *                 cliente:
 *                   type: string
 *                   format: objectId
 *                 apellidoAgendador:
 *                   type: string
 *                 apellidoComprador:
 *                   type: string
 *                 detallesPedido:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 facturas:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 vendedores:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         200:
 *           description: Pedido actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   tamañoOso:
 *                     type: string
 *                   nombreComprador:
 *                     type: string
 *                   numeroComprador:
 *                     type: string
 *                   nombreAgendador:
 *                     type: string
 *                   numeroAgendador:
 *                     type: string
 *                   localidad:
 *                     type: string
 *                   direccion:
 *                     type: string
 *                   barrio:
 *                     type: string
 *                   cliente:
 *                     type: string
 *                     format: objectId
 *                   apellidoAgendador:
 *                     type: string
 *                   apellidoComprador:
 *                     type: string
 *                   detallesPedido:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   facturas:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   vendedores:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/pedidos/:id', pedidoController.actualizarPedido);

/**
 * @swagger
 * path:
 *   /pedidos/{id}:
 *     delete:
 *       tags: [Pedido]
 *       summary: Eliminar un pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del pedido a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Pedido eliminado
 *         404:
 *           description: Pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/pedidos/:id', pedidoController.eliminarPedido);
