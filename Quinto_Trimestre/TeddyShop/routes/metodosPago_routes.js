const express = require('express');
const router = express.Router();
const {
    listarMetodosPago,
    crearMetodoPago,
    actualizarMetodoPago,
    obtenerMetodoPagoPorId,
    eliminarMetodoPago
} = require('../controllers/metodo_pago_controller'); // Importa los controladores

// Ruta para listar todos los métodos de pago
router.get('/', listarMetodosPago);

// Ruta para crear un nuevo método de pago
router.post('/', crearMetodoPago);

// Ruta para actualizar un método de pago por su ID
router.put('/:id', actualizarMetodoPago);

// Ruta para obtener un método de pago por su ID
router.get('/:id', obtenerMetodoPagoPorId);

// Ruta para eliminar un método de pago por su ID
router.delete('/:id', eliminarMetodoPago);

module.exports = router;
