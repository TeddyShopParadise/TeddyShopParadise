// validaciones/clienteValidation.js
const Joi = require('@hapi/joi');

const clienteSchemaValidation = Joi.object({
    dniCliente: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'El DNI del cliente debe ser un número',
            'number.integer': 'El DNI del cliente debe ser un número entero',
            'number.min': 'El DNI del cliente debe ser mayor que 0',
            'any.required': 'El DNI del cliente es un campo requerido'
        }),
    nombreCliente: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/)
        .messages({
            'string.base': 'El nombre del cliente debe ser un texto',
            'string.empty': 'El nombre del cliente no puede estar vacío',
            'string.min': 'El nombre del cliente debe tener al menos 3 caracteres',
            'string.max': 'El nombre del cliente no debe exceder los 100 caracteres',
            'any.required': 'El nombre del cliente es un campo requerido'
        }),
    telefonoCliente: Joi.string()
        .required()
        .length(7) // Cambia esto si quieres permitir un rango
        .pattern(/^[0-9]+$/)
        .messages({
            'string.base': 'El teléfono del cliente debe ser un número',
            'string.empty': 'El teléfono del cliente no puede estar vacío',
            'string.length': 'El teléfono del cliente debe tener exactamente 7 dígitos',
            'string.pattern.base': 'El teléfono del cliente debe contener solo dígitos',
            'any.required': 'El teléfono del cliente es un campo requerido'
        }),
    apellidoCliente: Joi.string()
        .max(100)
        .optional()
        .allow('')
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]*$/)
        .messages({
            'string.base': 'El apellido del cliente debe ser un texto',
            'string.max': 'El apellido del cliente no debe exceder los 100 caracteres'
        }),
    pedidos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los pedidos deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        }),
    facturas: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Las facturas deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID debe tener 24 caracteres hexadecimales'
        })
});

// Exportar la validación
module.exports = { clienteSchemaValidation };
