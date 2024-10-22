const express = require('express');
const router = express.Router();
const {
    listarMetodosPago,
    crearMetodoPago,
    actualizarMetodoPago,
    obtenerMetodoPagoPorId,
    eliminarMetodoPago
} = require('../controllers/metodo_pago_controller'); // Importa los controladores
/**
 * @swagger
 * tags:
 *   name: Metodo_Pago
 *   description: API para gestionar los métodos de pago
 */

/**
 * @swagger
 * path:
 *   /metodos-pago:
 *     get:
 *       tags: [Metodo_Pago]
 *       summary: Listar todos los métodos de pago
 *       responses:
 *         200:
 *           description: Lista de métodos de pago
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombreMetodoPago:
 *                       type: string
 *                     factura:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarMetodosPago);

/**
 * @swagger
 * path:
 *   /metodos-pago:
 *     post:
 *       tags: [Metodo_Pago]
 *       summary: Crear un nuevo método de pago
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombreMetodoPago:
 *                   type: string
 *                   required: true
 *                 factura:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Método de pago creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   nombreMetodoPago:
 *                     type: string
 *                   factura:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearMetodoPago);

/**
 * @swagger
 * path:
 *   /metodos-pago/{id}:
 *     get:
 *       tags: [Metodo_Pago]
 *       summary: Obtener un método de pago por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del método de pago a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Método de pago encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   nombreMetodoPago:
 *                     type: string
 *                   factura:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Método de pago no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerMetodoPagoPorId);

/**
 * @swagger
 * path:
 *   /metodos-pago/{id}:
 *     put:
 *       tags: [Metodo_Pago]
 *       summary: Actualizar un método de pago por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del método de pago a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombreMetodoPago:
 *                   type: string
 *                 factura:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Método de pago actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   nombreMetodoPago:
 *                     type: string
 *                   factura:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Método de pago no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarMetodoPago);

/**
 * @swagger
 * path:
 *   /metodos-pago/{id}:
 *     delete:
 *       tags: [Metodo_Pago]
 *       summary: Eliminar un método de pago por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del método de pago a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Método de pago eliminado
 *         404:
 *           description: Método de pago no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarMetodoPago);
