const express = require('express');
const router = express.Router();
const catalogoController = require('../Controllers/catalogo_controller');

// Ruta para crear un catálogo
router.post('/catalogos', catalogoController.crearCatalogo);

// Ruta para actualizar un catálogo
router.put('/catalogos/:id', catalogoController.actualizarCatalogo);

// Ruta para desactivar un catálogo
router.patch('/catalogos/:id/desactivar', catalogoController.desactivarCatalogo);

// Ruta para listar catálogos activos
router.get('/catalogos/activos', catalogoController.listarCatalogosActivos);

// Ruta para obtener un catálogo por su ID
router.get('/catalogos/:id', catalogoController.obtenerCatalogoPorId);

// Ruta para guardar una colección de catálogos
router.post('/catalogos/coleccion', catalogoController.guardarColeccionCatalogos);

module.exports = router;
