const express = require('express');
const router = express.Router();
const vendedorController = require('../Controllers/vendedor_controller');

/**
 * @swagger
 * /vendedor:
 *   get:
 *     summary: Obtiene todos los vendedores
 *     tags:
 *       - Vendedores
 *     responses:
 *       200:
 *         description: Lista de vendedores
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
 *                   dniEmpleado:
 *                     type: integer
 *                     example: 12345678
 *                   codigoVendedor:
 *                     type: string
 *                     example: "VND-001"
 *                   empleado:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7d"
 *       500:
 *         description: Error interno del servidor
 */

router.get('/', vendedorController.listarVendedores);

/**
 * @swagger
 * /vendedor:
 *   post:
 *     summary: Crea un nuevo vendedor
 *     tags:
 *       - Vendedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniEmpleado:
 *                 type: integer
 *                 example: 12345678
 *               codigoVendedor:
 *                 type: string
 *                 example: "VND-001"
 *               empleado:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       201:
 *         description: Vendedor creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */



router.post('/', vendedorController.crearVendedor);

/**
 * @swagger
 * /vendedor/{id}:
 *   get:
 *     summary: Obtiene un vendedor por su ID
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vendedor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendedor encontrado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id', vendedorController.obtenerVendedorPorId);

/**
 * @swagger
 * /vendedor/{id}:
 *   put:
 *     summary: Actualiza un vendedor por su ID
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vendedor
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
 *                 example: 12345678
 *               codigoVendedor:
 *                 type: string
 *                 example: "VND-001"
 *               empleado:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       200:
 *         description: Vendedor actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Vendedor no encontrado
 */

router.put('/:id', vendedorController.actualizarVendedor);

/**
 * @swagger
 * /vendedor/{id}:
 *   delete:
 *     summary: Elimina un vendedor por su ID
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del vendedor
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendedor eliminado exitosamente
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.delete('/:id', vendedorController.eliminarVendedor);


module.exports = router;