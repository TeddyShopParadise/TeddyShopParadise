const logic = require('../logic/administrador_logic');
const { administradorSchemaValidation } = require('../Validations/administrador_validation'); 

// Controlador para listar todos los administradores
const listarAdministradores = async (req, res) => {
    try {
        const administradores = await logic.listarAdministradores();
        if (administradores.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(administradores);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un administrador
const crearAdministrador = async (req, res) => {
    const body = req.body;

    const { error, value } = administradorSchemaValidation.validate({
        dniEmpleado: body.dniEmpleado,
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoAdministrador = await logic.crearAdministrador(value);
        res.status(201).json(nuevoAdministrador);
    } catch (err) {
        if (err.message === 'Ya existe un administrador con este DNI') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un administrador
const actualizarAdministrador = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const { error, value } = administradorSchemaValidation.validate({
        dniEmpleado: body.dniEmpleado,
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const administradorActualizado = await logic.actualizarAdministrador(id, value);
        if (!administradorActualizado) {
            return res.status(404).json({ error: 'Administrador no encontrado' });
        }
        res.json(administradorActualizado);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un administrador por su ID
const obtenerAdministradorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const administrador = await logic.buscarAdministradorPorId(id);
        res.json(administrador);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un administrador
const eliminarAdministrador = async (req, res) => {
    const { id } = req.params;
    try {
        const administradorEliminado = await logic.eliminarAdministrador(id);
        res.json(administradorEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarAdministradores,
    crearAdministrador,
    actualizarAdministrador,
    obtenerAdministradorPorId,
    eliminarAdministrador
};
