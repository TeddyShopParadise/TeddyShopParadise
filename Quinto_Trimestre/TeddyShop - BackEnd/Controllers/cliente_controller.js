// controllers/cliente_controller.js
const logic = require('../logic/cliente_logic'); // Asegúrate de importar la lógica
const { clienteSchemaValidation } = require('../Validations/cliente_validation'); // Importa la validación

// Controlador para listar todos los clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await logic.listarClientes();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un cliente
const crearCliente = async (req, res) => {
    const body = req.body;

    const { error, value } = clienteSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoCliente = await logic.crearCliente(value);
        res.status(201).json(nuevoCliente);
    } catch (err) {
        if (err.message === 'Ya existe un cliente con este DNI') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un cliente
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = clienteSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const clienteActualizado = await logic.actualizarCliente(id, value);
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(clienteActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un cliente por su ID
const obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await logic.buscarClientePorId(id);
        res.json(cliente);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un cliente por su ID
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteEliminado = await logic.eliminarCliente(id);
        res.json(clienteEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarClientes,
    crearCliente,
    actualizarCliente,
    obtenerClientePorId,
    eliminarCliente
};
