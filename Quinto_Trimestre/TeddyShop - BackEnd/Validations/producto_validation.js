// validaciones/productoValidation.js
const Joi = require('@hapi/joi');

const productoSchemaValidation = Joi.object({
    estiloProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'El estilo del producto debe ser un texto',
            'any.required': 'El estilo del producto es un campo requerido'
        }),
    cmCabezaColaProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'La medida de cabeza a cola debe ser un texto',
            'any.required': 'La medida de cabeza a cola es un campo requerido'
        }),
    materialProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'El material del producto debe ser un texto',
            'any.required': 'El material del producto es un campo requerido'
        }),
    disponibilidadProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'La disponibilidad del producto debe ser un texto',
            'any.required': 'La disponibilidad del producto es un campo requerido'
        }),
    cmColaPataProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'La medida de cola a pata debe ser un texto',
            'any.required': 'La medida de cola a pata es un campo requerido'
        }),
    tamañoProducto: Joi.string()
        .required()
        .messages({
            'string.base': 'El tamaño del producto debe ser un texto',
            'any.required': 'El tamaño del producto es un campo requerido'
        }),
    historialPrecios: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID del historial de precios debe ser un ID válido',
            'string.length': 'El ID del historial de precios debe tener 24 caracteres'
        }),
    catalogos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID del catálogo debe ser un ID válido',
            'string.length': 'El ID del catálogo debe tener 24 caracteres'
        }),
    categorias: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID de la categoría debe ser un ID válido',
            'string.length': 'El ID de la categoría debe tener 24 caracteres'
        })
});

// Exportar la validación
module.exports = { productoSchemaValidation };
