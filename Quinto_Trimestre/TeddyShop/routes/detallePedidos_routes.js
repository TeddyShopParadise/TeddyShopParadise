const express = require('express');
const router = express.Router();
const {
    listarDetallesPedido,
    crearDetallePedido,
    actualizarDetallePedido,
    obtenerDetallePedidoPorId,
    eliminarDetallePedido
} = require('../controllers/detalle_pedido_controller'); // Asegúrate de importar los controladores
/**
 * @swagger
 * tags:
 *   name: DetallePedido
 *   description: API para gestionar detalles de pedido
 */

/**
 * @swagger
 * path:
 *   /detalle-pedido:
 *     get:
 *       tags: [DetallePedido]
 *       summary: Listar todos los detalles de pedido
 *       responses:
 *         200:
 *           description: Lista de detalles de pedido
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numDetalle:
 *                       type: number
 *                     precioDetallePedido:
 *                       type: number
 *                     cantidadDetallePedido:
 *                       type: number
 *                     pedidoNumPedido:
 *                       type: string
 *                       format: objectId
 *                     productoIdProducto:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarDetallesPedido);

/**
 * @swagger
 * path:
 *   /detalle-pedido:
 *     post:
 *       tags: [DetallePedido]
 *       summary: Crear un nuevo detalle de pedido
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numDetalle:
 *                   type: number
 *                   required: true
 *                 precioDetallePedido:
 *                   type: number
 *                   required: true
 *                 cantidadDetallePedido:
 *                   type: number
 *                   required: true
 *                 pedidoNumPedido:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *                 productoIdProducto:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Detalle de pedido creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetallePedido:
 *                     type: number
 *                   cantidadDetallePedido:
 *                     type: number
 *                   pedidoNumPedido:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearDetallePedido);

/**
 * @swagger
 * path:
 *   /detalle-pedido/{id}:
 *     put:
 *       tags: [DetallePedido]
 *       summary: Actualizar un detalle de pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de pedido a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 numDetalle:
 *                   type: number
 *                 precioDetallePedido:
 *                   type: number
 *                 cantidadDetallePedido:
 *                   type: number
 *                 pedidoNumPedido:
 *                   type: string
 *                   format: objectId
 *                 productoIdProducto:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Detalle de pedido actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetallePedido:
 *                     type: number
 *                   cantidadDetallePedido:
 *                     type: number
 *                   pedidoNumPedido:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Detalle de pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarDetallePedido);

/**
 * @swagger
 * path:
 *   /detalle-pedido/{id}:
 *     get:
 *       tags: [DetallePedido]
 *       summary: Obtener un detalle de pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de pedido a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Detalle de pedido encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetallePedido:
 *                     type: number
 *                   cantidadDetallePedido:
 *                     type: number
 *                   pedidoNumPedido:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Detalle de pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerDetallePedidoPorId);

/**
 * @swagger
 * path:
 *   /detalle-pedido/{id}:
 *     delete:
 *       tags: [DetallePedido]
 *       summary: Eliminar un detalle de pedido por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de pedido a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Detalle de pedido eliminado
 *         404:
 *           description: Detalle de pedido no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarDetallePedido);
