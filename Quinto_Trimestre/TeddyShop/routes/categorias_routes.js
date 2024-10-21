const express = require('express');
const router = express.Router();
const categoriaController = require('../Controllers/categoria_controller');

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Listar todas las categorías
 *     responses:
 *       200:
 *         description: Lista de categorías.
 *       500:
 *         description: Error al listar las categorías.
 */
router.get('/categorias', categoriaController.listarCategorias);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *                 example: "Electrónica"
 *               descripcionCategoria:
 *                 type: string
 *                 example: "Categoría de productos electrónicos"
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *       400:
 *         description: Error en la creación de la categoría.
 */
router.post('/categorias', categoriaController.crearCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada.
 *       404:
 *         description: Categoría no encontrada.
 */
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreCategoria:
 *                 type: string
 *               descripcionCategoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 */
router.put('/categorias/:id', categoriaController.actualizarCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Categoría eliminada exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 */
router.delete('/categorias/:id', categoriaController.eliminarCategoria);

module.exports = router;
