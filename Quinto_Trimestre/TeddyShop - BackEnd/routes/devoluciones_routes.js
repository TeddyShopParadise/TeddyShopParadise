const express = require('express');
const router = express.Router();
const {
    listarDevoluciones,
    crearDevolucion,
    actualizarDevolucion,
    obtenerDevolucionPorId,
    eliminarDevolucion
} = require('../controllers/devoluciones_controller'); // Importa los controladores

/**
 * @swagger
 * /devoluciones:
 *   get:
 *     summary: Obtiene todas las devoluciones
 *     tags:
 *       - Devoluciones
 *     responses:
 *       200:
 *         description: Lista de devoluciones
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
 *                   numDevolucion:
 *                     type: number
 *                     example: 1
 *                   motivoDevolucion:
 *                     type: string
 *                     example: "Producto defectuoso"
 *                   fechaDevolucion:
 *                     type: string
 *                     format: date
 *                     example: "2024-10-22"
 *                   productoId:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para listar todas las devoluciones
router.get('/', listarDevoluciones);

/**
 * @swagger
 * /devoluciones:
 *   post:
 *     summary: Crea una nueva devolución
 *     tags:
 *       - Devoluciones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numDevolucion:
 *                 type: number
 *                 example: 1
 *               motivoDevolucion:
 *                 type: string
 *                 example: "Producto defectuoso"
 *               fechaDevolucion:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-22"
 *               productoId:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       201:
 *         description: Devolución creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para crear una nueva devolución
router.post('/', crearDevolucion);

/**
 * @swagger
 * /devoluciones/{id}:
 *   put:
 *     summary: Actualiza una devolución por su ID
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la devolución
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numDevolucion:
 *                 type: number
 *                 example: 1
 *               motivoDevolucion:
 *                 type: string
 *                 example: "Producto defectuoso"
 *               fechaDevolucion:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-22"
 *               productoId:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *     responses:
 *       200:
 *         description: Devolución actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Devolución no encontrada
 */



// Ruta para actualizar una devolución por su ID
router.put('/:id', actualizarDevolucion);

/**
 * @swagger
 * /devoluciones/{id}:
 *   get:
 *     summary: Obtiene una devolución por su ID
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la devolución
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devolución encontrada
 *       404:
 *         description: Devolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para obtener una devolución por su ID
router.get('/:id', obtenerDevolucionPorId);

/**
 * @swagger
 * /devoluciones/{id}:
 *   delete:
 *     summary: Elimina una devolución por su ID
 *     tags:
 *       - Devoluciones
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la devolución
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Devolución eliminada exitosamente
 *       404:
 *         description: Devolución no encontrada
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para eliminar una devolución por su ID
router.delete('/:id', eliminarDevolucion);

module.exports = router;
