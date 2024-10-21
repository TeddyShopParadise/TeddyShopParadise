const express = require('express');
const router = express.Router();
const clienteController = require('../Controllers/cliente_controller');

// Ruta para listar todos los clientes
router.get('/clientes', clienteController.listarClientes);

// Ruta para crear un nuevo cliente
router.post('/clientes', clienteController.crearCliente);

// Ruta para obtener un cliente por su ID
router.get('/clientes/:id', clienteController.obtenerClientePorId);

// Ruta para actualizar un cliente por su ID
router.put('/clientes/:id', clienteController.actualizarCliente);

// Ruta para eliminar un cliente por su ID
router.delete('/clientes/:id', clienteController.eliminarCliente);

module.exports = router;
