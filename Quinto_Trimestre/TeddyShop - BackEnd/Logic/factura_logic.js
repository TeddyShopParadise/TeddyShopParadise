const Factura = require('../models/factura_model');
const DetalleFactura = require('../models/detalleFactura_model'); // Asegúrate de tener el modelo de DetalleFactura
const Cliente = require('../models/cliente_model'); // Asegúrate de tener el modelo de Cliente
const Pedido = require('../models/pedido_model'); // Asegúrate de tener el modelo de Pedido
const MetodoPago = require('../models/metodoPago_model'); // Asegúrate de tener el modelo de MetodoPago

// Función asíncrona para crear una nueva factura
async function crearFactura(body) {
    const factura = new Factura({
        fechaCreacionFactura: body.fechaCreacionFactura,
        horaCreacionFactura: body.horaCreacionFactura,
        pedido: body.pedido, // Asegúrate de que sea un ObjectId válido
        cliente: body.cliente, // Asegúrate de que sea un ObjectId válido
        detallesFactura: body.detallesFactura || [], // Inicializa como array vacío si no hay detalles
        metodoPago: body.metodoPago // Puede ser null si no hay método de pago
    });

    return await factura.save();
}

// Función asíncrona para actualizar una factura
async function actualizarFactura(id, body) {
    const factura = await Factura.findByIdAndUpdate(id, {
        $set: {
            fechaCreacionFactura: body.fechaCreacionFactura,
            horaCreacionFactura: body.horaCreacionFactura,
            pedido: body.pedido,
            cliente: body.cliente,
            detallesFactura: body.detallesFactura,
            metodoPago: body.metodoPago
        }
    }, { new: true });

    return factura;
}

// Función asíncrona para listar todas las facturas
async function listarFacturas() {
    const facturas = await Factura.find()
        .populate('pedido', 'numPedido') // Muestra el número de pedido
        .populate('cliente', 'nombreCliente') // Muestra el nombre del cliente
        .populate('detallesFactura') // Muestra detalles de la factura
        .populate('metodoPago', 'nombreMetodoPago'); // Muestra el nombre del método de pago
    return facturas;
}

// Función asíncrona para buscar una factura por su ID
async function buscarFacturaPorId(id) {
    try {
        const factura = await Factura.findById(id)
            .populate('pedido', 'numPedido')
            .populate('cliente', 'nombreCliente')
            .populate('detallesFactura')
            .populate('metodoPago', 'nombreMetodoPago');
        
        if (!factura) {
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    } catch (err) {
        console.error(`Error al buscar la factura por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar una factura por su ID
async function eliminarFactura(id) {
    try {
        const factura = await Factura.findByIdAndDelete(id);
        if (!factura) {
            throw new Error(`Factura con ID ${id} no encontrada`);
        }
        return factura;
    } catch (err) {
        console.error(`Error al eliminar la factura: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearFactura,
    actualizarFactura,
    listarFacturas,
    buscarFacturaPorId,
    eliminarFactura
};
