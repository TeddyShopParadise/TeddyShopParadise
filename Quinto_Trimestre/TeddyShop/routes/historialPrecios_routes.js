const express = require('express');
const router = express.Router();
const {
    listarHistorialPrecios,
    crearHistorialPrecio,
    actualizarHistorialPrecio,
    obtenerHistorialPrecioPorId,
    eliminarHistorialPrecio
} = require('../controllers/historial_precio_controller'); // Importa los controladores
/**
 * @swagger
 * tags:
 *   name: Historial_Precio
 *   description: API para gestionar el historial de precios de los productos
 */

/**
 * @swagger
 * path:
 *   /historial-precios:
 *     get:
 *       tags: [Historial_Precio]
 *       summary: Listar todos los historiales de precios
 *       responses:
 *         200:
 *           description: Lista de historiales de precios
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     precio:
 *                       type: number
 *                       format: decimal
 *                     fechaInicio:
 *                       type: string
 *                       format: date-time
 *                     fechaFin:
 *                       type: string
 *                       format: date-time
 *                     estadoPrecio:
 *                       type: boolean
 *                     producto:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarHistorialPrecios);

/**
 * @swagger
 * path:
 *   /historial-precios:
 *     post:
 *       tags: [Historial_Precio]
 *       summary: Crear un nuevo historial de precio
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 precio:
 *                   type: number
 *                   format: decimal
 *                   required: true
 *                 fechaInicio:
 *                   type: string
 *                   format: date-time
 *                   required: true
 *                 fechaFin:
 *                   type: string
 *                   format: date-time
 *                   required: true
 *                 estadoPrecio:
 *                   type: boolean
 *                   required: true
 *                 producto:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Historial de precio creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                   fechaInicio:
 *                     type: string
 *                     format: date-time
 *                   fechaFin:
 *                     type: string
 *                     format: date-time
 *                   estadoPrecio:
 *                     type: boolean
 *                   producto:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearHistorialPrecio);

/**
 * @swagger
 * path:
 *   /historial-precios/{id}:
 *     get:
 *       tags: [Historial_Precio]
 *       summary: Obtener un historial de precio por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del historial de precio a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Historial de precio encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                   fechaInicio:
 *                     type: string
 *                     format: date-time
 *                   fechaFin:
 *                     type: string
 *                     format: date-time
 *                   estadoPrecio:
 *                     type: boolean
 *                   producto:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Historial de precio no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerHistorialPrecioPorId);

/**
 * @swagger
 * path:
 *   /historial-precios/{id}:
 *     put:
 *       tags: [Historial_Precio]
 *       summary: Actualizar un historial de precio por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del historial de precio a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 precio:
 *                   type: number
 *                   format: decimal
 *                 fechaInicio:
 *                   type: string
 *                   format: date-time
 *                 fechaFin:
 *                   type: string
 *                   format: date-time
 *                 estadoPrecio:
 *                   type: boolean
 *                 producto:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Historial de precio actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                   fechaInicio:
 *                     type: string
 *                     format: date-time
 *                   fechaFin:
 *                     type: string
 *                     format: date-time
 *                   estadoPrecio:
 *                     type: boolean
 *                   producto:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Historial de precio no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarHistorialPrecio);

/**
 * @swagger
 * path:
 *   /historial-precios/{id}:
 *     delete:
 *       tags: [Historial_Precio]
 *       summary: Eliminar un historial de precio por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del historial de precio a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Historial de precio eliminado
 *         404:
 *           description: Historial de precio no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarHistorialPrecio);
