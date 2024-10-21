const express = require('express');
const router = express.Router();
const {
    listarHistorialPrecios,
    crearHistorialPrecio,
    actualizarHistorialPrecio,
    obtenerHistorialPrecioPorId,
    eliminarHistorialPrecio
} = require('../controllers/historial_precio_controller'); // Importa los controladores

// Ruta para listar todos los historiales de precios
router.get('/', listarHistorialPrecios);

// Ruta para crear un nuevo historial de precio
router.post('/', crearHistorialPrecio);

// Ruta para actualizar un historial de precio por su ID
router.put('/:id', actualizarHistorialPrecio);

// Ruta para obtener un historial de precio por su ID
router.get('/:id', obtenerHistorialPrecioPorId);

// Ruta para eliminar un historial de precio por su ID
router.delete('/:id', eliminarHistorialPrecio);

module.exports = router;
