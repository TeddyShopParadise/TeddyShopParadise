const express = require('express');
const router = express.Router();
const vendedorController = require('../Controllers/vendedor_controller');
/**
 * @swagger
 * tags:
 *   name: Vendedor
 *   description: API para gestionar vendedores
 */

/**
 * @swagger
 * path:
 *   /vendedores:
 *     get:
 *       tags: [Vendedor]
 *       summary: Listar todos los vendedores
 *       responses:
 *         200:
 *           description: Lista de vendedores
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     dniEmpleado:
 *                       type: integer
 *                     codigoVendedor:
 *                       type: string
 *                     empleado:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/vendedores', vendedorController.listarVendedores);

/**
 * @swagger
 * path:
 *   /vendedores:
 *     post:
 *       tags: [Vendedor]
 *       summary: Crear un nuevo vendedor
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dniEmpleado:
 *                   type: integer
 *                   required: true
 *                 codigoVendedor:
 *                   type: string
 *                   required: true
 *                 empleado:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *       responses:
 *         201:
 *           description: Vendedor creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   dniEmpleado:
 *                     type: integer
 *                   codigoVendedor:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/vendedores', vendedorController.crearVendedor);

/**
 * @swagger
 * path:
 *   /vendedores/{id}:
 *     get:
 *       tags: [Vendedor]
 *       summary: Obtener un vendedor por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del vendedor a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Vendedor encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   dniEmpleado:
 *                     type: integer
 *                   codigoVendedor:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Vendedor no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/vendedores/:id', vendedorController.obtenerVendedorPorId);

/**
 * @swagger
 * path:
 *   /vendedores/{id}:
 *     put:
 *       tags: [Vendedor]
 *       summary: Actualizar un vendedor por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del vendedor a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dniEmpleado:
 *                   type: integer
 *                 codigoVendedor:
 *                   type: string
 *                 empleado:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Vendedor actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   dniEmpleado:
 *                     type: integer
 *                   codigoVendedor:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Vendedor no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/vendedores/:id', vendedorController.actualizarVendedor);

/**
 * @swagger
 * path:
 *   /vendedores/{id}:
 *     delete:
 *       tags: [Vendedor]
 *       summary: Eliminar un vendedor por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del vendedor a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Vendedor eliminado
 *         404:
 *           description: Vendedor no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/vendedores/:id', vendedorController.eliminarVendedor);
