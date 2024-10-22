const express = require('express');
const router = express.Router();
const {
    listarMetodosPago,
    crearMetodoPago,
    actualizarMetodoPago,
    obtenerMetodoPagoPorId,
    eliminarMetodoPago
} = require('../Controllers/metodoPago_controller'); // Importa los controladores

/**
 * @swagger
 * /metodos-pago:
 *   get:
 *     summary: Obtiene todos los métodos de pago
 *     tags:
 *       - Métodos de Pago
 *     responses:
 *       200:
 *         description: Lista de métodos de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a79"
 *                   nombreMetodoPago:
 *                     type: string
 *                     example: "Tarjeta de Crédito"
 *                   factura:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', listarMetodosPago);

/**
 * @swagger
 * /metodos-pago:
 *   post:
 *     summary: Crea un nuevo método de pago
 *     tags:
 *       - Métodos de Pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMetodoPago:
 *                 type: string
 *                 example: "Tarjeta de Crédito"
 *               factura:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       201:
 *         description: Método de pago creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', crearMetodoPago);

/**
 * @swagger
 * /metodos-pago/{id}:
 *   get:
 *     summary: Obtiene un método de pago por su ID
 *     tags:
 *       - Métodos de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago encontrado
 *       404:
 *         description: Método de pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.get('/:id', obtenerMetodoPagoPorId);

/**
 * @swagger
 * /metodos-pago/{id}:
 *   put:
 *     summary: Actualiza un método de pago por su ID
 *     tags:
 *       - Métodos de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreMetodoPago:
 *                 type: string
 *                 example: "Tarjeta de Crédito"
 *               factura:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       200:
 *         description: Método de pago actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Método de pago no encontrado
 */

router.put('/:id', actualizarMetodoPago);

/**
 * @swagger
 * /metodos-pago/{id}:
 *   delete:
 *     summary: Elimina un método de pago por su ID
 *     tags:
 *       - Métodos de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del método de pago
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Método de pago eliminado exitosamente
 *       404:
 *         description: Método de pago no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.delete('/:id', eliminarMetodoPago);

module.exports = router;