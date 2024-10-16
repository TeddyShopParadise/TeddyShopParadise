// validaciones/empleadoValidation.js
const Joi = require('@hapi/joi');

const empleadoSchemaValidation = Joi.object({
    dniEmpleado: Joi.number()
        .required()
        .messages({
            'number.base': 'El DNI del empleado debe ser un número',
            'any.required': 'El DNI del empleado es un campo requerido',
            'number.integer': 'El DNI del empleado debe ser un número entero'
        }),
    telefonoEmpleado: Joi.string()
        .required()
        .messages({
            'string.base': 'El teléfono del empleado debe ser un texto',
            'any.required': 'El teléfono del empleado es un campo requerido'
        }),
    codigoEmpleado: Joi.string()
        .required()
        .messages({
            'string.base': 'El código del empleado debe ser un texto',
            'any.required': 'El código del empleado es un campo requerido'
        }),
    fechaNacimientoEmpleado: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de nacimiento del empleado debe ser una fecha válida',
            'any.required': 'La fecha de nacimiento del empleado es un campo requerido'
        }),
    nombreEmpleado: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del empleado debe ser un texto',
            'any.required': 'El nombre del empleado es un campo requerido'
        }),
    compania: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'La compañía debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID de la compañía debe tener 24 caracteres',
            'any.required': 'La compañía es un campo requerido'
        }),
    administrador: Joi.string().length(24).hex().optional()
        .messages({
            'string.base': 'El ID del administrador debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID del administrador debe tener 24 caracteres'
        }),
    usuario: Joi.string().length(24).hex().optional()
        .messages({
            'string.base': 'El ID del usuario debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID del usuario debe tener 24 caracteres'
        }),
    vendedor: Joi.string().length(24).hex().optional()
        .messages({
            'string.base': 'El ID del vendedor debe ser un ID válido en formato hexadecimal',
            'string.length': 'El ID del vendedor debe tener 24 caracteres'
        }),
    vendedorPedidos: Joi.array().items(Joi.string().length(24).hex()).optional()
        .messages({
            'array.base': 'Los vendedores de pedidos deben ser un array de IDs válidos',
            'string.length': 'Cada ID de vendedor de pedido debe tener 24 caracteres'
        }),
    vendedorCatalogos: Joi.array().items(Joi.string().length(24).hex()).optional()
        .messages({
            'array.base': 'Los vendedores de catálogos deben ser un array de IDs válidos',
            'string.length': 'Cada ID de vendedor de catálogo debe tener 24 caracteres'
        }),
});

// Exportar la validación
module.exports = { empleadoSchemaValidation };
