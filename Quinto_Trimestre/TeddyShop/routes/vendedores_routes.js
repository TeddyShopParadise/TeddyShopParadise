const express = require('express');
const router = express.Router();
const vendedorController = require('../Controllers/vendedor_controller');

// Ruta para listar todos los vendedores
router.get('/vendedores', vendedorController.listarVendedores);

// Ruta para crear un nuevo vendedor
router.post('/vendedores', vendedorController.crearVendedor);

// Ruta para obtener un vendedor por su ID
router.get('/vendedores/:id', vendedorController.obtenerVendedorPorId);

// Ruta para actualizar un vendedor por su ID
router.put('/vendedores/:id', vendedorController.actualizarVendedor);

// Ruta para eliminar un vendedor por su ID
router.delete('/vendedores/:id', vendedorController.eliminarVendedor);

module.exports = router;