const Devoluciones = require('../models/devoluciones_model');
//const Inventario = require('../models/inventario_model'); // Asegúrate de tener el modelo de Inventario

// Función asíncrona para crear una nueva devolución
async function crearDevolucion(body) {
    let devolucion = new Devoluciones({
        detalleDevolucion: body.detalleDevolucion,
        inventarios: body.inventarios // Asegúrate de que sea un array de ObjectId válidos
    });

    return await devolucion.save();
}

// Función asíncrona para actualizar una devolución
async function actualizarDevolucion(id, body) {
    let devolucion = await Devoluciones.findByIdAndUpdate(id, {
        $set: {
            detalleDevolucion: body.detalleDevolucion,
            inventarios: body.inventarios // Asegúrate de que sea un array de ObjectId válidos
        }
    }, { new: true });

    return devolucion;
}

// Función asíncrona para listar todas las devoluciones
async function listarDevoluciones() {
    let devoluciones = await Devoluciones.find()
        .populate('inventarios', 'nombreInventario'); // Reemplaza con los campos relevantes de Inventario
    return devoluciones;
}

// Función asíncrona para buscar una devolución por su ID
async function buscarDevolucionPorId(id) {
    try {
        const devolucion = await Devoluciones.findById(id)
            .populate('inventarios', 'nombreInventario'); // Reemplaza con los campos relevantes de Inventario
        if (!devolucion) {
            throw new Error(`Devolución con ID ${id} no encontrada`);
        }
        return devolucion;
    } catch (err) {
        console.error(`Error al buscar la devolución por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar una devolución por su ID
async function eliminarDevolucion(id) {
    try {
        const devolucion = await Devoluciones.findByIdAndDelete(id);
        if (!devolucion) {
            throw new Error(`Devolución con ID ${id} no encontrada`);
        }
        return devolucion;
    } catch (err) {
        console.error(`Error al eliminar la devolución: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearDevolucion,
    actualizarDevolucion,
    listarDevoluciones,
    buscarDevolucionPorId,
    eliminarDevolucion
};
