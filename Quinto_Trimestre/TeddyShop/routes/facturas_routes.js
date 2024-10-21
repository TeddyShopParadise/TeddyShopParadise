const express = require('express');
const router = express.Router();
const {
    listarFacturas,
    crearFactura,
    actualizarFactura,
    obtenerFacturaPorId,
    eliminarFactura
} = require('../controllers/factura_controller'); // Importa los controladores

// Ruta para listar todas las facturas
router.get('/', listarFacturas);

// Ruta para crear una nueva factura
router.post('/', crearFactura);

// Ruta para actualizar una factura por su ID
router.put('/:id', actualizarFactura);

// Ruta para obtener una factura por su ID
router.get('/:id', obtenerFacturaPorId);

// Ruta para eliminar una factura por su ID
router.delete('/:id', eliminarFactura);

module.exports = router;
