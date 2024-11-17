//Controlador para Producto
const logic = require('../Logic/producto_logic'); 
const Producto = require('../models/producto_model');
const { productoSchemaValidation } = require('../Validations/producto_validation'); 

// Controlador para listar todos los productos
const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categorias');
        if (!productos) {
          return res.status(404).json({ message: 'No se encontraron productos' });
        }
        res.json(productos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
      }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
    const body = req.body;

    const { error, value } = productoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoProducto = await logic.crearProducto(value);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { _id, __v, ...cleanedBody } = body;

    const { error, value } = productoSchemaValidation.validate(cleanedBody);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const productoActualizado = await logic.actualizarProducto(id, value);
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await logic.buscarProductoPorId(id);
        res.json(producto);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un producto por su ID
const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const productoEliminado = await logic.eliminarProducto(id);
        res.json(productoEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    obtenerProductoPorId,
    eliminarProducto
};
