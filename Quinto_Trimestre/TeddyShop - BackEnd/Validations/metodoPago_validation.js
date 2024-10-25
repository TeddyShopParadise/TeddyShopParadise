// validaciones/metodoPagoValidation.js
const Joi = require('@hapi/joi');

const metodoPagoSchemaValidation = Joi.object({
    nombreMetodoPago: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del método de pago debe ser una cadena de texto',
            'any.required': 'El nombre del método de pago es un campo requerido'
        }),
    factura: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID de la factura debe ser un ID válido',
            'string.length': 'El ID de la factura debe tener 24 caracteres',
            'any.required': 'El ID de la factura es un campo requerido'
        })
});

// Exportar la validación
module.exports = { metodoPagoSchemaValidation };
