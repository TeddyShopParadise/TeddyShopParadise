const express = require('express');
const router = express.Router();
const {
    listarCompañias,
    crearCompañia,
    actualizarCompañia,
    obtenerCompañiaPorId,
    eliminarCompañia
} = require('../controllers/compañia_controller'); // Asegúrate de importar los controladores

/**
 * @swagger
 * components:
 *   schemas:
 *     Compañia:
 *       type: object
 *       properties:
 *         NIT:
 *           type: number
 *           description: El NIT de la compañía.
 *           example: 123456789
 *         telefonoEmpresa:
 *           type: string
 *           description: Teléfono de la compañía.
 *           example: '3001234567'
 *         nombreEmpresa:
 *           type: string
 *           description: Nombre de la compañía.
 *           example: 'Mi Compañía S.A.S.'
 *         direccionEmpresa:
 *           type: string
 *           description: Dirección de la compañía.
 *           example: 'Calle 123 #45-67'
 * 
 *   responses:
 *     CompañiaCreated:
 *       description: Compañía creada exitosamente.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compañia'
 */

/**
 * @swagger
 * /api/compañias:
 *   get:
 *     summary: Listar todas las compañías
 *     responses:
 *       200:
 *         description: Lista de compañías.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', listarCompañias);

/**
 * @swagger
 * /api/compañias:
 *   post:
 *     summary: Crear una nueva compañía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compañia'
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compañia'
 *       400:
 *         description: Datos inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/', crearCompañia);

/**
 * @swagger
 * /api/compañias/{id}:
 *   put:
 *     summary: Actualizar una compañía por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compañía a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compañia'
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente.
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', actualizarCompañia);

/**
 * @swagger
 * /api/compañias/{id}:
 *   get:
 *     summary: Obtener una compañía por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compañía a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compañía encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compañia'
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', obtenerCompañiaPorId);

/**
 * @swagger
 * /api/compañias/{id}:
 *   delete:
 *     summary: Eliminar una compañía por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compañía a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Compañía eliminada exitosamente.
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id', eliminarCompañia);

module.exports = router;
