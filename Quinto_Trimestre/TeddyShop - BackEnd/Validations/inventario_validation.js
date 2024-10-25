const Joi = require('joi');

// Esquema de validación para el modelo Inventario
const validarInventario = Joi.object({
    idInventario: Joi.number()
        .integer()
        .messages({
            'number.base': 'El ID del inventario debe ser un número.',
            'number.integer': 'El ID del inventario debe ser un número entero.',
            'any.required': 'El ID del inventario es obligatorio.'
        }),
    
    stockMinimo: Joi.number()
        .max(256)
        .required()
        .messages({
            'number.base': 'El stock mínimo debe ser un entero.',
            'number.max': 'El stock mínimo no debe exceder los 256 caracteres.',
            'any.required': 'El stock mínimo es obligatorio.'
        }),

    precioVenta: Joi.number()
        .precision(3)
        .positive()
        .optional()
        .messages({
            'number.base': 'El precio de venta debe ser un número.',
            'number.positive': 'El precio de venta debe ser un valor positivo.',
            'number.precision': 'El precio de venta debe tener hasta 3 decimales.'
        }),

    precioCompra: Joi.number()
        .precision(3)
        .positive()
        .optional()
        .messages({
            'number.base': 'El precio de compra debe ser un número.',
            'number.positive': 'El precio de compra debe ser un valor positivo.',
            'number.precision': 'El precio de compra debe tener hasta 3 decimales.'
        }),

    stock: Joi.number()
        .max(256)
        .required()
        .messages({
            'number.base': 'El stock debe ser un texto.',
            'number.max': 'El stock no debe exceder los 256 caracteres.',
            'any.required': 'El stock es obligatorio.'
        }),

    stockMaximo: Joi.number()
        .max(256)
        .required()
        .messages({
            'number.base': 'El stock máximo debe ser un texto.',
            'number.max': 'El stock máximo no debe exceder los 256 caracteres.',
            'any.required': 'El stock máximo es obligatorio.'
        }),

    idDevolucion: Joi.string()
        .messages({
            'string.base': 'El ID de devolución debe ser un identificador válido.',
            'any.required': 'El ID de devolución es obligatorio.'
        }),

    productoIdProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'El ID del producto debe ser un identificador válido.',
            'any.required': 'El ID del producto es obligatorio.'
        }),

    detalleFacturas: Joi.array()
        .items(Joi.string().messages({
            'string.base': 'El ID de la factura debe ser un identificador válido.'
        }))
        .optional()
        .messages({
            'array.base': 'El detalle de facturas debe ser un arreglo de identificadores.'
        }),

    movimientos: Joi.array()
        .items(Joi.string().messages({
            'string.base': 'El ID del movimiento debe ser un identificador válido.'
        }))
        .optional()
        .messages({
            'array.base': 'Los movimientos deben ser un arreglo de identificadores.'
        })
});

module.exports = {
    validarInventario
};
