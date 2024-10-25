const Producto = require('../models/producto_model');
const HistorialPrecio = require('../models/historialPrecio_model'); // Asegúrate de tener el modelo de HistorialPrecio
const Catalogo = require('../models/catalogo_model'); // Asegúrate de tener el modelo de Catalogo
const Categoria = require('../models/categoria_model'); // Asegúrate de tener el modelo de Categoria

// Función asíncrona para crear un nuevo producto
async function crearProducto(body) {
    const producto = new Producto({
        estiloProducto: body.estiloProducto,
        cmCabezaColaProducto: body.cmCabezaColaProducto,
        materialProducto: body.materialProducto,
        disponibilidadProducto: body.disponibilidadProducto,
        cmColaPataProducto: body.cmColaPataProducto,
        tamañoProducto: body.tamañoProducto,
        historialPrecios: body.historialPrecios || [],
        catalogos: body.catalogos || [],
        categorias: body.categorias || []
    });

    return await producto.save();
}

// Función asíncrona para actualizar un producto
async function actualizarProducto(id, body) {
    const producto = await Producto.findByIdAndUpdate(id, {
        $set: {
            estiloProducto: body.estiloProducto,
            cmCabezaColaProducto: body.cmCabezaColaProducto,
            materialProducto: body.materialProducto,
            disponibilidadProducto: body.disponibilidadProducto,
            cmColaPataProducto: body.cmColaPataProducto,
            tamañoProducto: body.tamañoProducto,
            historialPrecios: body.historialPrecios || [],
            catalogos: body.catalogos || [],
            categorias: body.categorias || []
        }
    }, { new: true });

    return producto;
}

// Función asíncrona para listar todos los productos
async function listarProductos() {
    const productos = await Producto.find()
        .populate('historialPrecios')
        .populate('catalogos')
        .populate('categorias');
    return productos;
}

// Función asíncrona para buscar un producto por su ID
async function buscarProductoPorId(id) {
    try {
        const producto = await Producto.findById(id)
            .populate('historialPrecios')
            .populate('catalogos')
            .populate('categorias');

        if (!producto) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    } catch (err) {
        console.error(`Error al buscar el producto por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un producto por su ID
async function eliminarProducto(id) {
    try {
        const producto = await Producto.findByIdAndDelete(id);
        if (!producto) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        return producto;
    } catch (err) {
        console.error(`Error al eliminar el producto: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearProducto,
    actualizarProducto,
    listarProductos,
    buscarProductoPorId,
    eliminarProducto
};
