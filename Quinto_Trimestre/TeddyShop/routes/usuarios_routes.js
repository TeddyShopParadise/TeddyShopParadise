const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
} = require('../controllers/usuario_controller'); // Asegúrate de importar los controladores
/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * path:
 *   /usuario:
 *     get:
 *       tags: [Usuario]
 *       summary: Listar todos los usuarios
 *       responses:
 *         200:
 *           description: Lista de usuarios
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     telefono:
 *                       type: string
 *                     contraseña:
 *                       type: string
 *                     username:
 *                       type: string
 *                     empleado:
 *                       type: string
 *                       format: objectId
 *                     estado:
 *                       type: boolean
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/', listarUsuarios);

/**
 * @swagger
 * path:
 *   /usuario:
 *     post:
 *       tags: [Usuario]
 *       summary: Crear un nuevo usuario
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   required: true
 *                 telefono:
 *                   type: string
 *                   required: true
 *                 contraseña:
 *                   type: string
 *                   required: true
 *                 username:
 *                   type: string
 *                   required: true
 *                 empleado:
 *                   type: string
 *                   format: objectId
 *                   required: true
 *                 estado:
 *                   type: boolean
 *                   required: true
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         201:
 *           description: Usuario creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   contraseña:
 *                     type: string
 *                   username:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *                   estado:
 *                     type: boolean
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/', crearUsuario);

/**
 * @swagger
 * path:
 *   /usuario/{id}:
 *     put:
 *       tags: [Usuario]
 *       summary: Actualizar un usuario por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del usuario a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 telefono:
 *                   type: string
 *                 contraseña:
 *                   type: string
 *                 username:
 *                   type: string
 *                 empleado:
 *                   type: string
 *                   format: objectId
 *                 estado:
 *                   type: boolean
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: objectId
 *       responses:
 *         200:
 *           description: Usuario actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   contraseña:
 *                     type: string
 *                   username:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *                   estado:
 *                     type: boolean
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Usuario no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/:id', actualizarUsuario);

/**
 * @swagger
 * path:
 *   /usuario/{id}:
 *     get:
 *       tags: [Usuario]
 *       summary: Obtener un usuario por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del usuario a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Usuario encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   contraseña:
 *                     type: string
 *                   username:
 *                     type: string
 *                   empleado:
 *                     type: string
 *                     format: objectId
 *                   estado:
 *                     type: boolean
 *                   roles:
 *                     type: array
 *                     items:
 *                       type: string
 *                       format: objectId
 *         404:
 *           description: Usuario no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/:id', obtenerUsuarioPorId);

/**
 * @swagger
 * path:
 *   /usuario/{id}:
 *     delete:
 *       tags: [Usuario]
 *       summary: Eliminar un usuario por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del usuario a eliminar
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Usuario eliminado
 *         404:
 *           description: Usuario no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.delete('/:id', eliminarUsuario);
