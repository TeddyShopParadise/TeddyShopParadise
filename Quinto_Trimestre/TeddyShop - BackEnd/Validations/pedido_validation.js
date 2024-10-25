// validaciones/pedidoValidation.js
const Joi = require('@hapi/joi');

const pedidoSchemaValidation = Joi.object({
    tamañoOso: Joi.string()
        .required()
        .messages({
            'string.base': 'El tamaño del oso debe ser un texto',
            'any.required': 'El tamaño del oso es un campo requerido'
        }),
    nombreComprador: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del comprador debe ser un texto',
            'any.required': 'El nombre del comprador es un campo requerido'
        }),
    numeroComprador: Joi.string()
        .required()
        .messages({
            'string.base': 'El número del comprador debe ser un texto',
            'any.required': 'El número del comprador es un campo requerido'
        }),
    nombreAgendador: Joi.string()
        .required()
        .messages({
            'string.base': 'El nombre del agendador debe ser un texto',
            'any.required': 'El nombre del agendador es un campo requerido'
        }),
    numeroAgendador: Joi.string()
        .required()
        .messages({
            'string.base': 'El número del agendador debe ser un texto',
            'any.required': 'El número del agendador es un campo requerido'
        }),
    localidad: Joi.string()
        .required()
        .messages({
            'string.base': 'La localidad debe ser un texto',
            'any.required': 'La localidad es un campo requerido'
        }),
    direccion: Joi.string()
        .required()
        .messages({
            'string.base': 'La dirección debe ser un texto',
            'any.required': 'La dirección es un campo requerido'
        }),
    barrio: Joi.string()
        .required()
        .messages({
            'string.base': 'El barrio debe ser un texto',
            'any.required': 'El barrio es un campo requerido'
        }),
    cliente: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El ID del cliente debe ser un ID válido',
            'string.length': 'El ID del cliente debe tener 24 caracteres',
            'any.required': 'El ID del cliente es un campo requerido'
        }),
    apellidoAgendador: Joi.string()
        .optional()
        .messages({
            'string.base': 'El apellido del agendador debe ser un texto'
        }),
    apellidoComprador: Joi.string()
        .optional()
        .messages({
            'string.base': 'El apellido del comprador debe ser un texto'
        }),
    detallesPedido: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID del detalle del pedido debe ser un ID válido',
            'string.length': 'El ID del detalle del pedido debe tener 24 caracteres'
        }),
    facturas: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID de la factura debe ser un ID válido',
            'string.length': 'El ID de la factura debe tener 24 caracteres'
        }),
    vendedores: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'string.base': 'El ID del vendedor debe ser un ID válido',
            'string.length': 'El ID del vendedor debe tener 24 caracteres'
        })
});

// Exportar la validación
module.exports = { pedidoSchemaValidation };
