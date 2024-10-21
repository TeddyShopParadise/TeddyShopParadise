const express = require('express');
const router = express.Router();
const {
    listarMovimientos,
    crearMovimiento,
    actualizarMovimiento,
    obtenerMovimientoPorId,
    eliminarMovimiento
} = require('../controllers/movimiento_controller'); // Importa los controladores

// Ruta para listar todos los movimientos
router.get('/', listarMovimientos);

// Ruta para crear un nuevo movimiento
router.post('/', crearMovimiento);

// Ruta para actualizar un movimiento por su ID
router.put('/:id', actualizarMovimiento);

// Ruta para obtener un movimiento por su ID
router.get('/:id', obtenerMovimientoPorId);

// Ruta para eliminar un movimiento por su ID
router.delete('/:id', eliminarMovimiento);

module.exports = router;
