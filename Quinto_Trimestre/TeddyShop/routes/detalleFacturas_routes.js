const express = require('express');
const router = express.Router();
const {
    listarDetallesFactura,
    crearDetalleFactura,
    actualizarDetalleFactura,
    obtenerDetalleFacturaPorId,
    eliminarDetalleFactura
} = require('../controllers/detalle_factura_controller'); // Asegúrate de importar los controladores
/**
 * @swagger
 * tags:
 *   name: DetalleFactura
 *   description: API para gestionar detalles de factura
 */

/**
 * @swagger
 * path:
 *   /detalle-factura:
 *     get:
 *       tags: [DetalleFactura]
 *       summary: Listar todos los detalles de factura
 *       responses:
 *         200:
 *           description: Lista de detalles de factura
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     numDetalle:
 *                       type: number
 *                     precioDetalleFactura:
 *                       type: number
 *                     cantidadDetalleFactura:
 *                       type: number
 *                     inventarioIdInventario:
 *                       type: string
 *                       format: objectId
 *                     productoIdProducto:
 *                       type: string
 *                       format: objectId
 *                     facturaIdFactura:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarDetallesFactura);

/**
 * @swagger
 * path:
 *   /detalle-factura:
 *     post:
 *       tags: [DetalleFactura]
 *       summary: Crear un nuevo detalle de factura
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
 *                 precioDetalleFactura:
 *                   type: number
 *                   required: true
 *                 cantidadDetalleFactura:
 *                   type: number
 *                   required: true
 *                 inventarioIdInventario:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *                 productoIdProducto:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *                 facturaIdFactura:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Detalle de factura creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetalleFactura:
 *                     type: number
 *                   cantidadDetalleFactura:
 *                     type: number
 *                   inventarioIdInventario:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *                   facturaIdFactura:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearDetalleFactura);

/**
 * @swagger
 * path:
 *   /detalle-factura/{id}:
 *     put:
 *       tags: [DetalleFactura]
 *       summary: Actualizar un detalle de factura por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de factura a actualizar
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
 *                 precioDetalleFactura:
 *                   type: number
 *                 cantidadDetalleFactura:
 *                   type: number
 *                 inventarioIdInventario:
 *                   type: string
 *                   format: objectId
 *                 productoIdProducto:
 *                   type: string
 *                   format: objectId
 *                 facturaIdFactura:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Detalle de factura actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetalleFactura:
 *                     type: number
 *                   cantidadDetalleFactura:
 *                     type: number
 *                   inventarioIdInventario:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *                   facturaIdFactura:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Detalle de factura no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarDetalleFactura);

/**
 * @swagger
 * path:
 *   /detalle-factura/{id}:
 *     get:
 *       tags: [DetalleFactura]
 *       summary: Obtener un detalle de factura por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de factura a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Detalle de factura encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   numDetalle:
 *                     type: number
 *                   precioDetalleFactura:
 *                     type: number
 *                   cantidadDetalleFactura:
 *                     type: number
 *                   inventarioIdInventario:
 *                     type: string
 *                     format: objectId
 *                   productoIdProducto:
 *                     type: string
 *                     format: objectId
 *                   facturaIdFactura:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Detalle de factura no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerDetalleFacturaPorId);

/**
 * @swagger
 * path:
 *   /detalle-factura/{id}:
 *     delete:
 *       tags: [DetalleFactura]
 *       summary: Eliminar un detalle de factura por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del detalle de factura a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Detalle de factura eliminado
 *         404:
 *           description: Detalle de factura no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarDetalleFactura);
