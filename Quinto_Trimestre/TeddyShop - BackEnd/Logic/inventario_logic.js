const Inventario = require('../models/inventario_model');

// Función asíncrona para crear un inventario
async function crearInventario(body) {
    // Verificar si ya existe un inventario con el mismo idInventario
    const inventarioExistente = await Inventario.findOne({ idInventario: body.idInventario });

    if (inventarioExistente) {
        throw new Error('Ya existe un inventario con este ID');
    }

    let inventario = new Inventario({
        idInventario: body.idInventario,
        stockMinimo: body.stockMinimo,
        precioVenta: body.precioVenta,
        precioCompra: body.precioCompra,
        stock: body.stock,
        stockMaximo: body.stockMaximo,
        idDevolucion: body.idDevolucion,
        productoIdProducto: body.productoIdProducto,
        detalleFacturas: body.detalleFacturas,
        movimientos: body.movimientos
    });

    return await inventario.save();
}

// Función asíncrona para actualizar un inventario
async function actualizarInventario(id, body) {
    let inventario = await Inventario.findByIdAndUpdate(id, {
        $set: {
            stockMinimo: body.stockMinimo,
            precioVenta: body.precioVenta,
            precioCompra: body.precioCompra,
            stock: body.stock,
            stockMaximo: body.stockMaximo,
            idDevolucion: body.idDevolucion,
            productoIdProducto: body.productoIdProducto,
            detalleFacturas: body.detalleFacturas,
            movimientos: body.movimientos
        }
    }, { new: true });

    if (!inventario) {
        throw new Error(`Inventario con ID ${id} no encontrado`);
    }

    return inventario;
}

// Función asíncrona para listar todos los inventarios
async function listarInventarios() {
    let inventarios = await Inventario.find()
        .populate('idDevolucion', 'descripcion')
        .populate('productoIdProducto', 'nombreProducto')
        .populate('detalleFacturas', 'detalle')
        .populate('movimientos', 'descripcionMovimiento');
    return inventarios;
}

// Función asíncrona para buscar un inventario por su ID
async function buscarInventarioPorId(id) {
    try {
        const inventario = await Inventario.findById(id)
            .populate('idDevolucion', 'descripcion')
            .populate('productoIdProducto', 'nombreProducto')
            .populate('detalleFacturas', 'detalle')
            .populate('movimientos', 'descripcionMovimiento');

        if (!inventario) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventario;
    } catch (err) {
        console.error(`Error al buscar el inventario por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un inventario por su ID
async function eliminarInventario(id) {
    try {
        const inventario = await Inventario.findByIdAndDelete(id);
        if (!inventario) {
            throw new Error(`Inventario con ID ${id} no encontrado`);
        }
        return inventario;
    } catch (err) {
        console.error(`Error al eliminar el inventario: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearInventario,
    actualizarInventario,
    listarInventarios,
    buscarInventarioPorId,
    eliminarInventario
};
