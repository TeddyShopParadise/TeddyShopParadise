const MetodoPago = require('../models/metodoPago_model'); // Asegúrate de que la ruta al modelo sea correcta
const Factura = require('../models/factura_model'); // Asegúrate de tener el modelo de Factura

// Función asíncrona para crear un nuevo método de pago
async function crearMetodoPago(body) {
    const metodoPago = new MetodoPago({
        nombreMetodoPago: body.nombreMetodoPago,
        factura: body.factura // Se espera un ObjectId de Factura
    });

    return await metodoPago.save();
}

// Función asíncrona para actualizar un método de pago
async function actualizarMetodoPago(id, body) {
    const metodoPago = await MetodoPago.findByIdAndUpdate(id, {
        $set: {
            nombreMetodoPago: body.nombreMetodoPago,
            factura: body.factura // Se espera un ObjectId de Factura
        }
    }, { new: true });

    return metodoPago;
}

// Función asíncrona para listar todos los métodos de pago
async function listarMetodosPago() {
    const metodosPago = await MetodoPago.find()
        .populate('factura'); // Puedes optar por mostrar información de la factura asociada
    return metodosPago;
}

// Función asíncrona para buscar un método de pago por su ID
async function buscarMetodoPagoPorId(id) {
    try {
        const metodoPago = await MetodoPago.findById(id)
            .populate('factura'); // Puedes optar por mostrar información de la factura asociada

        if (!metodoPago) {
            throw new Error(`Método de pago con ID ${id} no encontrado`);
        }
        return metodoPago;
    } catch (err) {
        console.error(`Error al buscar el método de pago por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un método de pago por su ID
async function eliminarMetodoPago(id) {
    try {
        const metodoPago = await MetodoPago.findByIdAndDelete(id);
        if (!metodoPago) {
            throw new Error(`Método de pago con ID ${id} no encontrado`);
        }
        return metodoPago;
    } catch (err) {
        console.error(`Error al eliminar el método de pago: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearMetodoPago,
    actualizarMetodoPago,
    listarMetodosPago,
    buscarMetodoPagoPorId,
    eliminarMetodoPago
};
