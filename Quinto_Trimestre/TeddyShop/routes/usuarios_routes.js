const express = require('express');
const router = express.Router();
const {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioPorId,
    eliminarUsuario
} = require('../controllers/usuario_controller'); // Asegúrate de importar los controladores

// Ruta para listar todos los usuarios
router.get('/', listarUsuarios);

// Ruta para crear un nuevo usuario
router.post('/', crearUsuario);

// Ruta para actualizar un usuario por su ID
router.put('/:id', actualizarUsuario);

// Ruta para obtener un usuario por su ID
router.get('/:id', obtenerUsuarioPorId);

// Ruta para eliminar un usuario por su ID
router.delete('/:id', eliminarUsuario);

module.exports = router;
