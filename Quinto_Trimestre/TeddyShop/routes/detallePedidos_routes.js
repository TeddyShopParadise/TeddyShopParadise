const express = require('express');
const router = express.Router();
const {
    listarDetallesPedido,
    crearDetallePedido,
    actualizarDetallePedido,
    obtenerDetallePedidoPorId,
    eliminarDetallePedido
} = require('../controllers/detalle_pedido_controller'); // Asegúrate de importar los controladores

// Ruta para listar todos los detalles de pedido
router.get('/', listarDetallesPedido);

// Ruta para crear un nuevo detalle de pedido
router.post('/', crearDetallePedido);

// Ruta para actualizar un detalle de pedido por su ID
router.put('/:id', actualizarDetallePedido);

// Ruta para obtener un detalle de pedido por su ID
router.get('/:id', obtenerDetallePedidoPorId);

// Ruta para eliminar un detalle de pedido por su ID
router.delete('/:id', eliminarDetallePedido);

module.exports = router;
