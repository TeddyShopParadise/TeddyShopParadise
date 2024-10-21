const express = require('express');
const router = express.Router();
const clienteController = require('../Controllers/cliente_controller');

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes.
 *       500:
 *         description: Error al listar los clientes.
 */
router.get('/clientes', clienteController.listarClientes);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniCliente:
 *                 type: number
 *                 example: 123456789
 *               nombreCliente:
 *                 type: string
 *                 example: "Juan Pérez"
 *               telefonoCliente:
 *                 type: string
 *                 example: "1234567890"
 *               fechaNacimientoCliente:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               apellidoCliente:
 *                 type: string
 *                 example: "González"
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente.
 *       400:
 *         description: Error en la creación del cliente.
 */
router.post('/clientes', clienteController.crearCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *       404:
 *         description: Cliente no encontrado.
 */
router.get('/clientes/:id', clienteController.obtenerClientePorId);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniCliente:
 *                 type: number
 *               nombreCliente:
 *                 type: string
 *               telefonoCliente:
 *                 type: string
 *               fechaNacimientoCliente:
 *                 type: string
 *                 format: date
 *               apellidoCliente:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 */
router.put('/clientes/:id', clienteController.actualizarCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 */
router.delete('/clientes/:id', clienteController.eliminarCliente);

module.exports = router;
