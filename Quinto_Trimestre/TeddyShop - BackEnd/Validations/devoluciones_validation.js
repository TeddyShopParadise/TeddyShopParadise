// validaciones/devolucionesValidation.js
const Joi = require('@hapi/joi');

const devolucionesSchemaValidation = Joi.object({
    numDevolucion: Joi.number()
        .required()
        .messages({
            'number.base': 'El número de devolución debe ser un número',
            'any.required': 'El número de devolución es un campo requerido'
        }),
    motivoDevolucion: Joi.string()
        .required()
        .messages({
            'string.base': 'El motivo de la devolución debe ser un texto',
            'any.required': 'El motivo de la devolución es un campo requerido'
        }),
    fechaDevolucion: Joi.date()
        .required()
        .messages({
            'date.base': 'La fecha de devolución debe ser una fecha válida',
            'any.required': 'La fecha de devolución es un campo requerido'
        }),
    productoId: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser un texto',
            'string.length': 'El ID del producto debe tener 24 caracteres',
            'string.hex': 'El ID del producto debe ser un ID válido en formato hexadecimal',
            'any.required': 'El ID del producto es un campo requerido'
        }),
    detalleDevolucion: Joi.string()
        .required()
        .messages({
            'string.base': 'El detalle de la devolución debe ser un texto',
            'any.required': 'El detalle de la devolución es un campo requerido'
        }),
    inventarios: Joi.array()
        .items(Joi.string().length(24).hex()) // Asegura que cada ID de inventario sea un ObjectId válido
        .messages({
            'array.base': 'Los inventarios deben ser un array',
            'string.length': 'Cada ID de inventario debe tener 24 caracteres',
            'string.hex': 'Cada ID de inventario debe ser un ID válido en formato hexadecimal'
        })
});

// Exportar la validación
module.exports = { devolucionesSchemaValidation };
