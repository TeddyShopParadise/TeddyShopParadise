//Controlador para Producto
const logic = require('../Logic/producto_logic'); 
const Producto = require('../models/producto_model');
const { productoSchemaValidation } = require('../Validations/producto_validation'); 
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid'); // Para generar un nombre único para las imágenes

cloudinary.config({
    cloud_name: 'peluches',    
    api_key: '381838619856281',          
    api_secret: 'K3bBlaVv-cGj1A0LopGfOLstHs4'    
  });

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
    const { imagen, ...resto } = body;  // Imagen es un campo que puede venir en el body

    const { error, value } = productoSchemaValidation.validate(resto);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        let imageUrl = ''; // Variable para guardar la URL de la imagen

        // Si se envía una imagen en la petición, subirla a Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.buffer, {
                public_id: uuidv4(),  // Generamos un ID único
                resource_type: 'auto',  // Cloudinary detectará el tipo de archivo automáticamente
            });
            imageUrl = result.secure_url;  // Obtenemos la URL segura de la imagen
        }

        // Si no se ha proporcionado una imagen, usamos una predeterminada
        const productoConImagen = { ...value, imagen: imageUrl || imagen };

        const nuevoProducto = await logic.crearProducto(productoConImagen);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error('Error al crear producto:', err);
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
        // Verificar si se ha subido una nueva imagen
        let imageUrl = value.imagen;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.buffer, {
                public_id: uuidv4(),  // Generar un ID único para la imagen
                resource_type: 'auto',
            });
            imageUrl = result.secure_url;  // Obtener la URL segura de la nueva imagen
        }

        // Actualizamos el producto con la nueva URL de imagen
        const productoActualizado = await logic.actualizarProducto(id, { ...value, imagen: imageUrl });
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(productoActualizado);
    } catch (err) {
        console.error('Error al actualizar producto:', err);
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
