const express = require('express');
const router = express.Router();
const {
    listarCompañias,
    crearCompañia,
    actualizarCompañia,
    obtenerCompañiaPorId,
    eliminarCompañia
} = require('../controllers/compañia_controller'); // Asegúrate de importar los controladores

// Ruta para listar todas las compañías
router.get('/', listarCompañias);

// Ruta para crear una nueva compañía
router.post('/', crearCompañia);

// Ruta para actualizar una compañía por su ID
router.put('/:id', actualizarCompañia);

// Ruta para obtener una compañía por su ID
router.get('/:id', obtenerCompañiaPorId);

// Ruta para eliminar una compañía por su ID
router.delete('/:id', eliminarCompañia);

module.exports = router;
