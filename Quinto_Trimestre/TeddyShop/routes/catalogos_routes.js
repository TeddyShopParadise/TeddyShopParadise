const express = require('express');
const router = express.Router();
const catalogoController = require('../Controllers/catalogo_controller');

/**
 * @swagger
 * tags:
 *   name: Catalogos
 *   description: API para gestionar catálogos
 */

/**
 * @swagger
 * path:
 *   /catalogos:
 *     post:
 *       tags: [Catalogos]
 *       summary: Crear un catálogo
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombreCatalogo:
 *                   type: string
 *                 descripcionCatalogo:
 *                   type: string
 *                   nullable: true
 *                 disponibilidadCatalogo:
 *                   type: boolean
 *                   default: true
 *                 estiloCatalogo:
 *                   type: string
 *                 compania:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         201:
 *           description: Catálogo creado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombreCatalogo:
 *                     type: string
 *                   descripcionCatalogo:
 *                     type: string
 *                     nullable: true
 *                   disponibilidadCatalogo:
 *                     type: boolean
 *                   estiloCatalogo:
 *                     type: string
 *                   compania:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/catalogos', catalogoController.crearCatalogo);

/**
 * @swagger
 * path:
 *   /catalogos/{id}:
 *     put:
 *       tags: [Catalogos]
 *       summary: Actualizar un catálogo
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del catálogo a actualizar
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombreCatalogo:
 *                   type: string
 *                 descripcionCatalogo:
 *                   type: string
 *                   nullable: true
 *                 disponibilidadCatalogo:
 *                   type: boolean
 *                   default: true
 *                 estiloCatalogo:
 *                   type: string
 *                 compania:
 *                   type: string
 *                   format: objectId
 *       responses:
 *         200:
 *           description: Catálogo actualizado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombreCatalogo:
 *                     type: string
 *                   descripcionCatalogo:
 *                     type: string
 *                     nullable: true
 *                   disponibilidadCatalogo:
 *                     type: boolean
 *                   estiloCatalogo:
 *                     type: string
 *                   compania:
 *                     type: string
 *                     format: objectId
 *         400:
 *           description: Error en la validación de datos
 *         404:
 *           description: Catálogo no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.put('/catalogos/:id', catalogoController.actualizarCatalogo);

/**
 * @swagger
 * path:
 *   /catalogos/{id}/desactivar:
 *     patch:
 *       tags: [Catalogos]
 *       summary: Desactivar un catálogo
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del catálogo a desactivar
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Catálogo desactivado
 *         404:
 *           description: Catálogo no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.patch('/catalogos/:id/desactivar', catalogoController.desactivarCatalogo);

/**
 * @swagger
 * path:
 *   /catalogos/activos:
 *     get:
 *       tags: [Catalogos]
 *       summary: Listar catálogos activos
 *       responses:
 *         200:
 *           description: Lista de catálogos activos
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nombreCatalogo:
 *                       type: string
 *                     descripcionCatalogo:
 *                       type: string
 *                       nullable: true
 *                     disponibilidadCatalogo:
 *                       type: boolean
 *                     estiloCatalogo:
 *                       type: string
 *                     compania:
 *                       type: string
 *                       format: objectId
 *         500:
 *           description: Error interno del servidor
 */
router.get('/catalogos/activos', catalogoController.listarCatalogosActivos);

/**
 * @swagger
 * path:
 *   /catalogos/{id}:
 *     get:
 *       tags: [Catalogos]
 *       summary: Obtener un catálogo por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID del catálogo a obtener
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Catálogo encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombreCatalogo:
 *                     type: string
 *                   descripcionCatalogo:
 *                     type: string
 *                     nullable: true
 *                   disponibilidadCatalogo:
 *                     type: boolean
 *                   estiloCatalogo:
 *                     type: string
 *                   compania:
 *                     type: string
 *                     format: objectId
 *         404:
 *           description: Catálogo no encontrado
 *         500:
 *           description: Error interno del servidor
 */
router.get('/catalogos/:id', catalogoController.obtenerCatalogoPorId);

/**
 * @swagger
 * path:
 *   /catalogos/coleccion:
 *     post:
 *       tags: [Catalogos]
 *       summary: Guardar una colección de catálogos
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 catalogos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombreCatalogo:
 *                         type: string
 *                       descripcionCatalogo:
 *                         type: string
 *                         nullable: true
 *                       disponibilidadCatalogo:
 *                         type: boolean
 *                         default: true
 *                       estiloCatalogo:
 *                         type: string
 *                       compania:
 *                         type: string
 *                         format: objectId
 *       responses:
 *         201:
 *           description: Colección de catálogos guardada
 *         400:
 *           description: Error en la validación de datos
 *         500:
 *           description: Error interno del servidor
 */
router.post('/catalogos/coleccion', catalogoController.guardarColeccionCatalogos);

module.exports = router;
