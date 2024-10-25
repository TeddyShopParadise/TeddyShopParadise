const express = require('express');
const administradorController = require('../Controllers/administrador_controller');
const router = express.Router(); // Define el enrutador

/**
 * @swagger
 * /administradores:
 *   get:
 *     summary: Lista todos los administradores
 *     tags:
 *       - Administradores
 *     responses:
 *       200:
 *         description: Lista de administradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a75"
 *                   dniEmpleado:
 *                     type: integer
 *                     example: 12345678
 *       204:
 *         description: No hay administradores disponibles
 */

router.get('/', administradorController.listarAdministradores);

/**
 * @swagger
 * /administradores:
 *   post:
 *     summary: Crea un nuevo administrador
 *     tags:
 *       - Administradores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniEmpleado:
 *                 type: integer
 *                 example: 87654321
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 dniEmpleado:
 *                   type: integer
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: El administrador ya existe
 */

router.post('/', administradorController.crearAdministrador);

/**
 * @swagger
 * /administradores/{id}:
 *   get:
 *     summary: Obtiene un administrador por su ID
 *     tags:
 *       - Administradores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del administrador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d2b6e3e6b0f99dbe0c5a75"
 *                 dniEmpleado:
 *                   type: integer
 *                   example: 12345678
 *       404:
 *         description: Administrador no encontrado
 */


router.get('/:id', administradorController.obtenerAdministradorPorId);

/**
 * @swagger
 * /administradores/{id}:
 *   put:
 *     summary: Actualiza un administrador por su ID
 *     tags:
 *       - Administradores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniEmpleado:
 *                 type: integer
 *                 example: 87654321
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Administrador no encontrado
 */

router.put('/:id', administradorController.actualizarAdministrador);

/**
 * @swagger
 * /administradores/{id}:
 *   delete:
 *     summary: Elimina un administrador por su ID
 *     tags:
 *       - Administradores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del administrador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */

router.delete('/:id', administradorController.eliminarAdministrador);

module.exports = router;
