const express = require('express');
const router = express.Router();
const administradorController = require('../Controllers/administrador_controller');

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: API para gestionar administradores
 */

/**
 * @swagger
 * path:
 *   /administradores:
 *     get:
 *       tags: [Administradores]
 *       summary: Listar todos los administradores
 *       responses:
 *         200:
 *           description: Lista de administradores
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     telefono:
 *                       type: string
 *                     email:
 *                       type: string
 *         500:
 *           description: Error interno del servidor
 */
router.get('/administradores', administradorController.listarAdministradores);

/**
 * @swagger
 * path:
 *   /administradores:
 *     post:
 *       tags: [Administradores]
 *       summary: Crear un nuevo administrador
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string
 *       responses:
 *         201:
 *           description: Administrador creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/administradores', administradorController.crearAdministrador);

/**
 * @swagger
 * path:
 *   /administradores/{id}:
 *     get:
 *       tags: [Administradores]
 *       summary: Obtener un administrador por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del administrador a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Administrador encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *         404:
 *           description: Administrador no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/administradores/:id', administradorController.obtenerAdministradorPorId);

/**
 * @swagger
 * path:
 *   /administradores/{id}:
 *     put:
 *       tags: [Administradores]
 *       summary: Actualizar un administrador por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del administrador a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 email:
 *                   type: string
 *       responses:
 *         200:
 *           description: Administrador actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   email:
 *                     type: string
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Administrador no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/administradores/:id', administradorController.actualizarAdministrador);

/**
 * @swagger
 * path:
 *   /administradores/{id}:
 *     delete:
 *       tags: [Administradores]
 *       summary: Eliminar un administrador por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del administrador a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Administrador eliminado
 *         404:
 *           description: Administrador no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/administradores/:id', administradorController.eliminarAdministrador);

module.exports = router;
