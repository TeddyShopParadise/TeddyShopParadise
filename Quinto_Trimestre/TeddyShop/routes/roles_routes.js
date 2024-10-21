const express = require('express');
const router = express.Router();
const {
    listarRoles,
    crearRol,
    actualizarRol,
    obtenerRolPorId,
    eliminarRol
} = require('../controllers/roles_controller'); // Importa los controladores

// Ruta para listar todos los roles
router.get('/', listarRoles);

// Ruta para crear un nuevo rol
router.post('/', crearRol);

// Ruta para actualizar un rol por su ID
router.put('/:id', actualizarRol);

// Ruta para obtener un rol por su ID
router.get('/:id', obtenerRolPorId);

// Ruta para eliminar un rol por su ID
router.delete('/:id', eliminarRol);

module.exports = router;
