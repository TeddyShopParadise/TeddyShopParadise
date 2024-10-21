const express = require('express');
const router = express.Router();
const {
    listarDetallesFactura,
    crearDetalleFactura,
    actualizarDetalleFactura,
    obtenerDetalleFacturaPorId,
    eliminarDetalleFactura
} = require('../controllers/detalle_factura_controller'); // Asegúrate de importar los controladores

// Ruta para listar todos los detalles de factura
router.get('/', listarDetallesFactura);

// Ruta para crear un nuevo detalle de factura
router.post('/', crearDetalleFactura);

// Ruta para actualizar un detalle de factura por su ID
router.put('/:id', actualizarDetalleFactura);

// Ruta para obtener un detalle de factura por su ID
router.get('/:id', obtenerDetalleFacturaPorId);

// Ruta para eliminar un detalle de factura por su ID
router.delete('/:id', eliminarDetalleFactura);

module.exports = router;
