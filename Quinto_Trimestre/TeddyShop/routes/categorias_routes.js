const express = require('express');
const router = express.Router();
const categoriaController = require('../Controllers/categoria_controller');

// Ruta para listar todas las categorías
router.get('/categorias', categoriaController.listarCategorias);

// Ruta para crear una nueva categoría
router.post('/categorias', categoriaController.crearCategoria);

// Ruta para obtener una categoría por su ID
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);

// Ruta para actualizar una categoría por su ID
router.put('/categorias/:id', categoriaController.actualizarCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/categorias/:id', categoriaController.eliminarCategoria);

module.exports = router;
