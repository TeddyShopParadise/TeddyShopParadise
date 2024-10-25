const express = require('express');
const router = express.Router();
const productoController = require('../Controllers/producto_controller');

/**
 * @swagger
 * /producto:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
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
 *                   estiloProducto:
 *                     type: string
 *                     example: "Estilo 1"
 *                   cmCabezaColaProducto:
 *                     type: string
 *                     example: "10 cm"
 *                   materialProducto:
 *                     type: string
 *                     example: "Algodón"
 *                   disponibilidadProducto:
 *                     type: string
 *                     example: "Disponible"
 *                   cmColaPataProducto:
 *                     type: string
 *                     example: "15 cm"
 *                   tamañoProducto:
 *                     type: string
 *                     example: "Mediano"
 *                   historialPrecios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7c"
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7d"
 *       500:
 *         description: Error interno del servidor
 */


router.get('/', productoController.listarProductos);

/**
 * @swagger
 * /producto:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estiloProducto:
 *                 type: string
 *                 example: "Estilo 1"
 *               cmCabezaColaProducto:
 *                 type: string
 *                 example: "10 cm"
 *               materialProducto:
 *                 type: string
 *                 example: "Algodón"
 *               disponibilidadProducto:
 *                 type: string
 *                 example: "Disponible"
 *               cmColaPataProducto:
 *                 type: string
 *                 example: "15 cm"
 *               tamañoProducto:
 *                 type: string
 *                 example: "Mediano"
 *               historialPrecios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               catalogos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


router.post('/', productoController.crearProducto);

/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */



router.get('/:id', productoController.obtenerProductoPorId);

/**
 * @swagger
 * /producto/{id}:
 *   put:
 *     summary: Actualiza un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estiloProducto:
 *                 type: string
 *                 example: "Estilo 1"
 *               cmCabezaColaProducto:
 *                 type: string
 *                 example: "10 cm"
 *               materialProducto:
 *                 type: string
 *                 example: "Algodón"
 *               disponibilidadProducto:
 *                 type: string
 *                 example: "Disponible"
 *               cmColaPataProducto:
 *                 type: string
 *                 example: "15 cm"
 *               tamañoProducto:
 *                 type: string
 *                 example: "Mediano"
 *               historialPrecios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               catalogos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               categorias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Producto no encontrado
 */


router.put('/:id', productoController.actualizarProducto);

/**
 * @swagger
 * /producto/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */


router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
