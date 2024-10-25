// validaciones/catalogoValidation.js
const Joi = require('@hapi/joi');

const catalogoSchemaValidation = Joi.object({
    nombreCatalogo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]+$/)
        .messages({
            'string.base': 'El nombre del catálogo debe ser un texto',
            'string.empty': 'El nombre del catálogo no puede estar vacío',
            'string.min': 'El nombre del catálogo debe tener al menos 3 caracteres',
            'string.max': 'El nombre del catálogo no debe exceder los 100 caracteres',
            'any.required': 'El nombre del catálogo es un campo requerido'
        }),
    descripcionCatalogo: Joi.string()
        .max(500)
        .optional()
        .allow('')
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]*$/)
        .messages({
            'string.base': 'La descripción del catálogo debe ser un texto',
            'string.max': 'La descripción del catálogo no debe exceder los 500 caracteres'
        }),
    disponibilidadCatalogo: Joi.boolean()
        .default(true)
        .messages({
            'boolean.base': 'La disponibilidad del catálogo debe ser un valor booleano'
        }),
    estiloCatalogo: Joi.string()
        .required()
        .messages({
            'string.base': 'El estilo del catálogo debe ser un texto',
            'any.required': 'El estilo del catálogo es un campo requerido'
        }),
    compania: Joi.string()
        .required()
        .messages({
            'string.base': 'La compañía debe ser un ID válido',
            'any.required': 'La compañía es un campo requerido'
        }),
    productos: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional(),
    vendedoresCatalogo: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
});

module.exports = { catalogoSchemaValidation };
