const DetalleFactura = require('../models/detalleFactura_model');
//const Inventario = require('../models/inventario_model');
const Producto = require('../models/producto_model');
const Factura = require('../models/factura_model');

// Función asíncrona para crear un nuevo detalle de factura
async function crearDetalleFactura(body) {
    let detalleFactura = new DetalleFactura({
        numDetalle: body.numDetalle,
        precioDetalleFactura: body.precioDetalleFactura,
        cantidadDetalleFactura: body.cantidadDetalleFactura,
        inventarioIdInventario: body.inventarioIdInventario,
        productoIdProducto: body.productoIdProducto,
        facturaIdFactura: body.facturaIdFactura
    });

    return await detalleFactura.save();
}

// Función asíncrona para actualizar un detalle de factura
async function actualizarDetalleFactura(id, body) {
    let detalleFactura = await DetalleFactura.findByIdAndUpdate(id, {
        $set: {
            numDetalle: body.numDetalle,
            precioDetalleFactura: body.precioDetalleFactura,
            cantidadDetalleFactura: body.cantidadDetalleFactura,
            inventarioIdInventario: body.inventarioIdInventario,
            productoIdProducto: body.productoIdProducto,
            facturaIdFactura: body.facturaIdFactura
        }
    }, { new: true });

    return detalleFactura;
}

// Función asíncrona para listar todos los detalles de factura
async function listarDetallesFactura() {
    let detallesFactura = await DetalleFactura.find()
        .populate('inventarioIdInventario', 'nombreInventario') // Reemplaza con los campos relevantes de Inventario
        .populate('productoIdProducto', 'nombreProducto') // Reemplaza con los campos relevantes de Producto
        .populate('facturaIdFactura', 'numeroFactura'); // Reemplaza con los campos relevantes de Factura
    return detallesFactura;
}

// Función asíncrona para buscar un detalle de factura por su ID
async function buscarDetalleFacturaPorId(id) {
    try {
        const detalleFactura = await DetalleFactura.findById(id)
            .populate('inventarioIdInventario', 'nombreInventario') // Reemplaza con los campos relevantes de Inventario
            .populate('productoIdProducto', 'nombreProducto') // Reemplaza con los campos relevantes de Producto
            .populate('facturaIdFactura', 'numeroFactura'); // Reemplaza con los campos relevantes de Factura
        if (!detalleFactura) {
            throw new Error(`Detalle de Factura con ID ${id} no encontrado`);
        }
        return detalleFactura;
    } catch (err) {
        console.error(`Error al buscar el detalle de factura por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un detalle de factura por su ID
async function eliminarDetalleFactura(id) {
    try {
        const detalleFactura = await DetalleFactura.findByIdAndDelete(id);
        if (!detalleFactura) {
            throw new Error(`Detalle de Factura con ID ${id} no encontrado`);
        }
        return detalleFactura;
    } catch (err) {
        console.error(`Error al eliminar el detalle de factura: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearDetalleFactura,
    actualizarDetalleFactura,
    listarDetallesFactura,
    buscarDetalleFacturaPorId,
    eliminarDetalleFactura
};
