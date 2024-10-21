const express = require('express');
const router = express.Router();
const productoController = require('../Controllers/producto_controller');
/**
 * @swagger
 * tags:
 *   name: Producto
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * path:
 *   /productos:
 *     get:
 *       tags: [Producto]
 *       summary: Listar todos los productos
 *       responses:
 *         200:
 *           description: Lista de productos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     estiloProducto:
 *                       type: string
 *                     cmCabezaColaProducto:
 *                       type: string
 *                     materialProducto:
 *                       type: string
 *                     disponibilidadProducto:
 *                       type: string
 *                     cmColaPataProducto:
 *                       type: string
 *                     tamañoProducto:
 *                       type: string
 *                     historialPrecios:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *                     catalogos:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *                     categorias:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/productos', productoController.listarProductos);

/**
 * @swagger
 * path:
 *   /productos:
 *     post:
 *       tags: [Producto]
 *       summary: Crear un nuevo producto
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estiloProducto:
 *                   type: string
 *                   required: true
 *                 cmCabezaColaProducto:
 *                   type: string
 *                   required: true
 *                 materialProducto:
 *                   type: string
 *                   required: true
 *                 disponibilidadProducto:
 *                   type: string
 *                   required: true
 *                 cmColaPataProducto:
 *                   type: string
 *                   required: true
 *                 tamañoProducto:
 *                   type: string
 *                   required: true
 *                 historialPrecios:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 catalogos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 categorias:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         201:
 *           description: Producto creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   estiloProducto:
 *                     type: string
 *                   cmCabezaColaProducto:
 *                     type: string
 *                   materialProducto:
 *                     type: string
 *                   disponibilidadProducto:
 *                     type: string
 *                   cmColaPataProducto:
 *                     type: string
 *                   tamañoProducto:
 *                     type: string
 *                   historialPrecios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/productos', productoController.crearProducto);

/**
 * @swagger
 * path:
 *   /productos/{id}:
 *     get:
 *       tags: [Producto]
 *       summary: Obtener un producto por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Producto encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   estiloProducto:
 *                     type: string
 *                   cmCabezaColaProducto:
 *                     type: string
 *                   materialProducto:
 *                     type: string
 *                   disponibilidadProducto:
 *                     type: string
 *                   cmColaPataProducto:
 *                     type: string
 *                   tamañoProducto:
 *                     type: string
 *                   historialPrecios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         404:
 *           description: Producto no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/productos/:id', productoController.obtenerProductoPorId);

/**
 * @swagger
 * path:
 *   /productos/{id}:
 *     put:
 *       tags: [Producto]
 *       summary: Actualizar un producto por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estiloProducto:
 *                   type: string
 *                 cmCabezaColaProducto:
 *                   type: string
 *                 materialProducto:
 *                   type: string
 *                 disponibilidadProducto:
 *                   type: string
 *                 cmColaPataProducto:
 *                   type: string
 *                 tamañoProducto:
 *                   type: string
 *                 historialPrecios:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 catalogos:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *                 categorias:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         200:
 *           description: Producto actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   estiloProducto:
 *                     type: string
 *                   cmCabezaColaProducto:
 *                     type: string
 *                   materialProducto:
 *                     type: string
 *                   disponibilidadProducto:
 *                     type: string
 *                   cmColaPataProducto:
 *                     type: string
 *                   tamañoProducto:
 *                     type: string
 *                   historialPrecios:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   catalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *                   categorias:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Producto no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/productos/:id', productoController.actualizarProducto);

/**
 * @swagger
 * path:
 *   /productos/{id}:
 *     delete:
 *       tags: [Producto]
 *       summary: Eliminar un producto por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del producto a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Producto eliminado
 *         404:
 *           description: Producto no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/productos/:id', productoController.eliminarProducto);
