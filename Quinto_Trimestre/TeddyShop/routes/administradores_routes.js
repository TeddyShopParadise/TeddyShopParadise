const express = require('express');
const router = express.Router();
const administradorController = require('../Controllers/administrador_controller');

// Ruta para listar todos los administradores
router.get('/administradores', administradorController.listarAdministradores);

// Ruta para crear un nuevo administrador
router.post('/administradores', administradorController.crearAdministrador);

// Ruta para obtener un administrador por su ID
router.get('/administradores/:id', administradorController.obtenerAdministradorPorId);

// Ruta para actualizar un administrador por su ID
router.put('/administradores/:id', administradorController.actualizarAdministrador);

// Ruta para eliminar un administrador por su ID
router.delete('/administradores/:id', administradorController.eliminarAdministrador);

module.exports = router;
