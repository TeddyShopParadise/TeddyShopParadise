const express = require('express');
const router = express.Router();
const {
    listarMovimientos,
    crearMovimiento,
    actualizarMovimiento,
    obtenerMovimientoPorId,
    eliminarMovimiento
} = require('../controllers/movimiento_controller'); // Importa los controladores
/**
 * @swagger
 * tags:
 *   name: Movimiento
 *   description: API para gestionar los movimientos de inventario
 */

/**
 * @swagger
 * path:
 *   /movimientos:
 *     get:
 *       tags: [Movimiento]
 *       summary: Listar todos los movimientos
 *       responses:
 *         200:
 *           description: Lista de movimientos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     fecha:
 *                       type: string
 *                       format: date-time
 *                     cantidadIngreso:
 *                       type: number
 *                     cantidadVendida:
 *                       type: number
 *                     inventario:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarMovimientos);

/**
 * @swagger
 * path:
 *   /movimientos:
 *     post:
 *       tags: [Movimiento]
 *       summary: Crear un nuevo movimiento
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date-time
 *                   required: true
 *                 cantidadIngreso:
 *                   type: number
 *                   required: true
 *                 cantidadVendida:
 *                   type: number
 *                   required: true
 *                 inventario:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Movimiento creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   cantidadIngreso:
 *                     type: number
 *                   cantidadVendida:
 *                     type: number
 *                   inventario:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearMovimiento);

/**
 * @swagger
 * path:
 *   /movimientos/{id}:
 *     get:
 *       tags: [Movimiento]
 *       summary: Obtener un movimiento por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del movimiento a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Movimiento encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   cantidadIngreso:
 *                     type: number
 *                   cantidadVendida:
 *                     type: number
 *                   inventario:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Movimiento no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerMovimientoPorId);

/**
 * @swagger
 * path:
 *   /movimientos/{id}:
 *     put:
 *       tags: [Movimiento]
 *       summary: Actualizar un movimiento por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del movimiento a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fecha:
 *                   type: string
 *                   format: date-time
 *                 cantidadIngreso:
 *                   type: number
 *                 cantidadVendida:
 *                   type: number
 *                 inventario:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Movimiento actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *                   cantidadIngreso:
 *                     type: number
 *                   cantidadVendida:
 *                     type: number
 *                   inventario:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Movimiento no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarMovimiento);

/**
 * @swagger
 * path:
 *   /movimientos/{id}:
 *     delete:
 *       tags: [Movimiento]
 *       summary: Eliminar un movimiento por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del movimiento a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Movimiento eliminado
 *         404:
 *           description: Movimiento no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarMovimiento);
