const Movimiento = require('../models/movimiento_model'); // Asegúrate de que la ruta al modelo sea correcta
//const Inventario = // require ('../models/inventario_model'); // Asegúrate de tener el modelo de Inventario

// Función asíncrona para crear un nuevo movimiento
async function crearMovimiento(body) {
    const movimiento = new Movimiento({
        fecha: body.fecha,
        cantidadIngreso: body.cantidadIngreso,
        cantidadVendida: body.cantidadVendida,
        inventario: body.inventario // Se espera un ObjectId de Inventario
    });

    return await movimiento.save();
}

// Función asíncrona para actualizar un movimiento
async function actualizarMovimiento(id, body) {
    const movimiento = await Movimiento.findByIdAndUpdate(id, {
        $set: {
            fecha: body.fecha,
            cantidadIngreso: body.cantidadIngreso,
            cantidadVendida: body.cantidadVendida,
            inventario: body.inventario // Se espera un ObjectId de Inventario
        }
    }, { new: true });

    return movimiento;
}

// Función asíncrona para listar todos los movimientos
async function listarMovimientos() {
    const movimientos = await Movimiento.find()
        .populate('inventario'); // Puedes optar por mostrar información del inventario asociado
    return movimientos;
}

// Función asíncrona para buscar un movimiento por su ID
async function buscarMovimientoPorId(id) {
    try {
        const movimiento = await Movimiento.findById(id)
            .populate('inventario'); // Puedes optar por mostrar información del inventario asociado

        if (!movimiento) {
            throw new Error(`Movimiento con ID ${id} no encontrado`);
        }
        return movimiento;
    } catch (err) {
        console.error(`Error al buscar el movimiento por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un movimiento por su ID
async function eliminarMovimiento(id) {
    try {
        const movimiento = await Movimiento.findByIdAndDelete(id);
        if (!movimiento) {
            throw new Error(`Movimiento con ID ${id} no encontrado`);
        }
        return movimiento;
    } catch (err) {
        console.error(`Error al eliminar el movimiento: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearMovimiento,
    actualizarMovimiento,
    listarMovimientos,
    buscarMovimientoPorId,
    eliminarMovimiento
};
