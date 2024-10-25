// validaciones/detalleFacturaValidation.js
const Joi = require('@hapi/joi');

const detalleFacturaSchemaValidation = Joi.object({
    numDetalle: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El número de detalle debe ser un número',
            'number.integer': 'El número de detalle debe ser un entero',
            'any.required': 'El número de detalle es un campo requerido'
        }),
    precioDetalleFactura: Joi.number()
        .precision(3) // Permite hasta tres decimales para representar un precio
        .required()
        .messages({
            'number.base': 'El precio del detalle de factura debe ser un número',
            'number.precision': 'El precio del detalle de factura debe tener hasta 2 decimales',
            'any.required': 'El precio del detalle de factura es un campo requerido'
        }),
    cantidadDetalleFactura: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'La cantidad del detalle de factura debe ser un número',
            'number.integer': 'La cantidad del detalle de factura debe ser un entero',
            'any.required': 'La cantidad del detalle de factura es un campo requerido'
        }),
    inventarioIdInventario: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del inventario debe ser un ID válido',
            'string.length': 'El ID del inventario debe tener 24 caracteres',
            'any.required': 'El ID del inventario es un campo requerido'
        }),
    productoIdProducto: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser un ID válido',
            'string.length': 'El ID del producto debe tener 24 caracteres',
            'any.required': 'El ID del producto es un campo requerido'
        }),
    facturaIdFactura: Joi.string()
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
module.exports = { detalleFacturaSchemaValidation };
