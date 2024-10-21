const express = require('express');
const router = express.Router();
const {
    listarDevoluciones,
    crearDevolucion,
    actualizarDevolucion,
    obtenerDevolucionPorId,
    eliminarDevolucion
} = require('../controllers/devoluciones_controller'); // Importa los controladores

// Ruta para listar todas las devoluciones
router.get('/', listarDevoluciones);

// Ruta para crear una nueva devolución
router.post('/', crearDevolucion);

// Ruta para actualizar una devolución por su ID
router.put('/:id', actualizarDevolucion);

// Ruta para obtener una devolución por su ID
router.get('/:id', obtenerDevolucionPorId);

// Ruta para eliminar una devolución por su ID
router.delete('/:id', eliminarDevolucion);

module.exports = router;
