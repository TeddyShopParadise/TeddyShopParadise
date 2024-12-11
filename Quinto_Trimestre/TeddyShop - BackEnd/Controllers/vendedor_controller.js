//Controlador para Vendedor
//Importación para que funcione correctamente
const Vendedor = require('../models/vendedor_model');  // Ruta correcta a tu modelo Vendedor
const logic = require('../Logic/vendedor_logic'); 
const { vendedorSchemaValidation } = require('../Validations/vendedor_validation'); 

// Controlador para listar todos los vendedores
const listarVendedores = async (req, res) => {
    try {
        const vendedores = await logic.listarVendedores();
        res.json(vendedores);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo vendedor
const crearVendedor = async (req, res) => {
    const body = req.body;

    try {
        // Verificar si el código del vendedor ya está en uso
        const vendedorExistente = await Vendedor.findOne({ codigoVendedor: body.codigoVendedor });
        if (vendedorExistente) {
            // Si el vendedor ya existe, responder con un código 409
            return res.status(409).json({
                error: 'Código de vendedor repetido',
                detalles: 'El código de vendedor que ingresaste ya está en uso.',
            });
        }

        // Validar los datos con Joi o cualquier otro validador
        const { error, value } = vendedorSchemaValidation.validate(body);
        if (error) {
            return res.status(400).json({
                error: 'Datos de entrada inválidos',
                detalles: error.details.map(detail => detail.message),
            });
        }

        // Si todo es válido, crear el vendedor
        const nuevoVendedor = await Vendedor.create(value);
        return res.status(201).json(nuevoVendedor);

    } catch (err) {
        console.error('Error interno al crear vendedor:', err);
        return res.status(500).json({ error: 'Error interno del servidor', detalles: err.message });
    }
};

// Controlador para actualizar un vendedor
const actualizarVendedor = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
        // Verificar si el dniEmpleado ya está en uso, excepto el que se está actualizando
        const vendedorConDniExistente = await Vendedor.findOne({
            dniEmpleado: body.dniEmpleado,
            _id: { $ne: id } // Excluye el vendedor actual de la verificación
        });

        if (vendedorConDniExistente) {
            return res.status(409).json({
                error: 'DNI de vendedor repetido',
                detalles: 'El DNI del empleado ya está en uso por otro vendedor.',
            });
        }

        // Verificar si el código del vendedor ya está en uso, excepto el que se está actualizando
        const vendedorConCodigoExistente = await Vendedor.findOne({
            codigoVendedor: body.codigoVendedor,
            _id: { $ne: id } // Excluye el vendedor actual de la verificación
        });

        if (vendedorConCodigoExistente) {
            return res.status(409).json({
                error: 'Código de vendedor repetido',
                detalles: 'El código de vendedor que ingresaste ya está en uso por otro vendedor.',
            });
        }
        
        // Validar los datos con Joi o cualquier otro validador
        const { error, value } = vendedorSchemaValidation.validate(body);
        if (error) {
            return res.status(400).json({
                error: 'Datos de entrada inválidos',
                detalles: error.details.map(detail => detail.message),
            });
        }

        // Intentar actualizar el vendedor
        const vendedorActualizado = await Vendedor.findByIdAndUpdate(id, value, { new: true });
        if (!vendedorActualizado) {
            return res.status(404).json({ error: 'Vendedor no encontrado' });
        }
        res.json(vendedorActualizado);
    } catch (err) {
        console.error('Error interno al actualizar vendedor:', err);
        res.status(500).json({ error: 'Error interno del servidor', detalles: err.message });
    }
};

// Controlador para obtener un vendedor por su ID
const obtenerVendedorPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const vendedor = await logic.buscarVendedorPorId(id);
        res.json(vendedor);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un vendedor por su ID
const eliminarVendedor = async (req, res) => {
    const { id } = req.params;
    try {
        const vendedorEliminado = await logic.eliminarVendedor(id);
        res.json(vendedorEliminado);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
// Exportar los controladores
module.exports = {
    listarVendedores,
    crearVendedor,
    actualizarVendedor,
    obtenerVendedorPorId,
    eliminarVendedor
};
