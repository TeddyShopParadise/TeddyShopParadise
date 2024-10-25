const Vendedor = require('../models/vendedor_model');
const Empleado = require('../models/empleado_model'); // Asegúrate de tener el modelo de Empleado

// Función asíncrona para crear un nuevo vendedor
async function crearVendedor(body) {
    const vendedor = new Vendedor({
        dniEmpleado: body.dniEmpleado,
        codigoVendedor: body.codigoVendedor,
        empleado: body.empleado // Se espera un ObjectId de Empleado
    });

    return await vendedor.save();
}

// Función asíncrona para actualizar un vendedor
async function actualizarVendedor(id, body) {
    const vendedor = await Vendedor.findByIdAndUpdate(id, {
        $set: {
            dniEmpleado: body.dniEmpleado,
            codigoVendedor: body.codigoVendedor,
            empleado: body.empleado // Se espera un ObjectId de Empleado
        }
    }, { new: true });

    return vendedor;
}

// Función asíncrona para listar todos los vendedores
async function listarVendedores() {
    const vendedores = await Vendedor.find()
        .populate('empleado'); // Puedes optar por mostrar información del empleado asociado
    return vendedores;
}

// Función asíncrona para buscar un vendedor por su ID
async function buscarVendedorPorId(id) {
    try {
        const vendedor = await Vendedor.findById(id)
            .populate('empleado'); // Puedes optar por mostrar información del empleado asociado

        if (!vendedor) {
            throw new Error(`Vendedor con ID ${id} no encontrado`);
        }
        return vendedor;
    } catch (err) {
        console.error(`Error al buscar el vendedor por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un vendedor por su ID
async function eliminarVendedor(id) {
    try {
        const vendedor = await Vendedor.findByIdAndDelete(id);
        if (!vendedor) {
            throw new Error(`Vendedor con ID ${id} no encontrado`);
        }
        return vendedor;
    } catch (err) {
        console.error(`Error al eliminar el vendedor: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearVendedor,
    actualizarVendedor,
    listarVendedores,
    buscarVendedorPorId,
    eliminarVendedor
};
