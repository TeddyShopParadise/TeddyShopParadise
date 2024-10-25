const Cliente = require('../models/cliente_model');
const Pedido = require('../models/pedido_model');
const Factura = require('../models/factura_model');

// Función asíncrona para crear un cliente
async function crearCliente(body) {
    // Verificar si ya existe un cliente con el mismo DNI
    const clienteExistente = await Cliente.findOne({ dniCliente: body.dniCliente });

    if (clienteExistente) {
        throw new Error('Ya existe un cliente con este DNI');
    }

    let cliente = new Cliente({
        dniCliente: body.dniCliente,
        nombreCliente: body.nombreCliente,
        telefonoCliente: body.telefonoCliente,
        fechaNacimientoCliente: body.fechaNacimientoCliente,
        apellidoCliente: body.apellidoCliente,
        pedidos: body.pedidos,
        facturas: body.facturas
    });

    return await cliente.save();
}

// Función asíncrona para actualizar un cliente
async function actualizarCliente(id, body) {
    let cliente = await Cliente.findByIdAndUpdate(id, {
        $set: {
            dniCliente: body.dniCliente,
            nombreCliente: body.nombreCliente,
            telefonoCliente: body.telefonoCliente,
            fechaNacimientoCliente: body.fechaNacimientoCliente,
            apellidoCliente: body.apellidoCliente,
            pedidos: body.pedidos,
            facturas: body.facturas
        }
    }, { new: true });

    return cliente;
}

// Función asíncrona para listar todos los clientes
async function listarClientes() {
    let clientes = await Cliente.find()
        .populate('pedidos', 'detallePedido') // Reemplaza 'detallePedido' con el campo relevante de Pedido
        .populate('facturas', 'numeroFactura'); // Reemplaza 'numeroFactura' con el campo relevante de Factura
    return clientes;
}

// Función asíncrona para buscar un cliente por su ID
async function buscarClientePorId(id) {
    try {
        const cliente = await Cliente.findById(id)
            .populate('pedidos', 'detallePedido') // Reemplaza 'detallePedido' con el campo relevante de Pedido
            .populate('facturas', 'numeroFactura'); // Reemplaza 'numeroFactura' con el campo relevante de Factura
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    } catch (err) {
        console.error(`Error al buscar el cliente por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para eliminar un cliente por su ID
async function eliminarCliente(id) {
    try {
        const cliente = await Cliente.findByIdAndDelete(id);
        if (!cliente) {
            throw new Error(`Cliente con ID ${id} no encontrado`);
        }
        return cliente;
    } catch (err) {
        console.error(`Error al eliminar el cliente: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearCliente,
    actualizarCliente,
    listarClientes,
    buscarClientePorId,
    eliminarCliente
};
