const Empleado = require('../models/empleado_model');
const Compania = require('../models/compañia_model'); // Asegúrate de tener el modelo de Compañia

// Función asíncrona para crear un nuevo empleado
async function crearEmpleado(body) {
    const empleado = new Empleado({
        dniEmpleado: body.dniEmpleado,
        telefonoEmpleado: body.telefonoEmpleado,
        codigoEmpleado: body.codigoEmpleado,
        fechaNacimientoEmpleado: body.fechaNacimientoEmpleado,
        nombreEmpleado: body.nombreEmpleado,
        compania: body.compania, // Asegúrate de que sea un ObjectId válido
        administrador: body.administrador, // Puede ser null si no hay administrador
        usuario: body.usuario, // Puede ser null si no hay usuario
        vendedor: body.vendedor, // Puede ser null si no hay vendedor
        vendedorPedidos: body.vendedorPedidos || [], // Inicializa como array vacío si no hay pedidos
        vendedorCatalogos: body.vendedorCatalogos || [] // Inicializa como array vacío si no hay catalogos
    });

    return await empleado.save();
}

// Función asíncrona para actualizar un empleado
async function actualizarEmpleado(id, body) {
    const empleado = await Empleado.findByIdAndUpdate(id, {
        $set: {
            dniEmpleado: body.dniEmpleado,
            telefonoEmpleado: body.telefonoEmpleado,
            codigoEmpleado: body.codigoEmpleado,
            fechaNacimientoEmpleado: body.fechaNacimientoEmpleado,
            nombreEmpleado: body.nombreEmpleado,
            compania: body.compania, // Asegúrate de que sea un ObjectId válido
            administrador: body.administrador,
            usuario: body.usuario,
            vendedor: body.vendedor,
            vendedorPedidos: body.vendedorPedidos,
            vendedorCatalogos: body.vendedorCatalogos
        }
    }, { new: true });

    return empleado;
}

// Función asíncrona para listar todos los empleados
async function listarEmpleados() {
    const empleados = await Empleado.find()
        .populate('compania', 'nombreEmpresa') // Muestra el nombre de la compañía
        .populate('administrador', 'dniEmpleado nombreEmpleado') // Muestra datos del administrador
        .populate('usuario', 'email username') // Muestra datos del usuario
        .populate('vendedor', 'nombreVendedor'); // Muestra datos del vendedor
    return empleados;
}

// Función asíncrona para buscar un empleado por su ID
async function buscarEmpleadoPorId(id) {
    try {
        const empleado = await Empleado.findById(id)
            .populate('compania', 'nombreEmpresa')
            .populate('administrador', 'dniEmpleado nombreEmpleado')
            .populate('usuario', 'email username')
            .populate('vendedor', 'nombreVendedor');
        
        if (!empleado) {
            throw new Error(`Empleado con ID ${id} no encontrado`);
        }
        return empleado;
    } catch (err) {
        console.error(`Error al buscar el empleado por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un empleado por su ID
async function eliminarEmpleado(id) {
    try {
        const empleado = await Empleado.findByIdAndDelete(id);
        if (!empleado) {
            throw new Error(`Empleado con ID ${id} no encontrado`);
        }
        return empleado;
    } catch (err) {
        console.error(`Error al eliminar el empleado: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearEmpleado,
    actualizarEmpleado,
    listarEmpleados,
    buscarEmpleadoPorId,
    eliminarEmpleado
};
