const Administrador = require('../models/administrador_model');
const Empleado = require('../models/empleado_model');

// Función asíncrona para crear un administrador
async function crearAdministrador(body) {
    // Verificar si ya existe un administrador con el mismo DNI
    const administradorExistente = await Administrador.findOne({ dniEmpleado: body.dniEmpleado });

    if (administradorExistente) {
        throw new Error('Ya existe un administrador con este DNI');
    }

    let administrador = new Administrador({
        dniEmpleado: body.dniEmpleado
    });

    return await administrador.save();
}

// Función asíncrona para actualizar un administrador
async function actualizarAdministrador(id, body) {
    let administrador = await Administrador.findByIdAndUpdate(id, {
        $set: {
            dniEmpleado: body.dniEmpleado
        }
    }, { new: true });

    return administrador;
}

// Función asíncrona para listar todos los administradores
async function listarAdministradores() {
    let administradores = await Administrador.find().populate('dniEmpleado');
    return administradores;
}

// Función asíncrona para buscar un administrador por su ID
async function buscarAdministradorPorId(id) {
    try {
        const administrador = await Administrador.findById(id).populate('dniEmpleado');
        if (!administrador) {
            throw new Error(`Administrador con ID ${id} no encontrado`);
        }
        return administrador;
    } catch (err) {
        console.error(`Error al buscar el administrador por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un administrador por su ID
async function eliminarAdministrador(id) {
    try {
        const administrador = await Administrador.findByIdAndDelete(id);
        if (!administrador) {
            throw new Error(`Administrador con ID ${id} no encontrado`);
        }
        return administrador;
    } catch (err) {
        console.error(`Error al eliminar el administrador: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearAdministrador,
    actualizarAdministrador,
    listarAdministradores,
    buscarAdministradorPorId,
    eliminarAdministrador
};
