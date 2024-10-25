// validaciones/vendedorValidation.js
const Joi = require('@hapi/joi');

const vendedorSchemaValidation = Joi.object({
    dniEmpleado: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El DNI del empleado debe ser un número',
            'number.integer': 'El DNI del empleado debe ser un número entero',
            'any.required': 'El DNI del empleado es un campo requerido'
        }),
    codigoVendedor: Joi.string()
        .required()
        .messages({
            'string.base': 'El código del vendedor debe ser un texto',
            'any.required': 'El código del vendedor es un campo requerido'
        }),
    empleado: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del empleado debe ser un ID válido',
            'string.length': 'El ID del empleado debe tener 24 caracteres',
            'any.required': 'El ID del empleado es un campo requerido'
        })
});

// Exportar la validación
module.exports = { vendedorSchemaValidation };
