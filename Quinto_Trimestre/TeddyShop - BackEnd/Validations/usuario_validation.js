// validaciones/usuarioValidation.js
const Joi = require('@hapi/joi');

const usuarioSchemaValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.base': 'El correo electrónico debe ser un texto',
            'string.email': 'Debe ser un correo electrónico válido',
            'string.empty': 'El correo electrónico no puede estar vacío',
            'any.required': 'El correo electrónico es un campo requerido'
        }),
    telefono: Joi.string()
        .pattern(/^[0-9]{7,15}$/)
        .required()
        .messages({
            'string.base': 'El teléfono debe ser un texto',
            'string.empty': 'El teléfono no puede estar vacío',
            'string.pattern.base': 'El teléfono debe tener entre 7 y 15 dígitos',
            'any.required': 'El teléfono es un campo requerido'
        }),
    contraseña: Joi.string()
        .min(8)
        .max(100)
        .required()
        .pattern(/^[A-Za-z0-9@#\-_$%^&+=!?]*$/)
        .messages({
            'string.base': 'La contraseña debe ser un texto',
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos 8 caracteres',
            'string.max': 'La contraseña no debe exceder los 100 caracteres',
            'string.pattern.base': 'La contraseña puede contener letras, números y símbolos permitidos (@#-_$%^&+=!?)',
            'any.required': 'La contraseña es un campo requerido'
        }),
    username: Joi.string()
        .min(3)
        .max(50)
        .required()
        .pattern(/^[A-Za-z0-9_]{3,50}$/)
        .messages({
            'string.base': 'El nombre de usuario debe ser un texto',
            'string.empty': 'El nombre de usuario no puede estar vacío',
            'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
            'string.max': 'El nombre de usuario no debe exceder los 50 caracteres',
            'string.pattern.base': 'El nombre de usuario solo puede contener letras, números y guiones bajos',
            'any.required': 'El nombre de usuario es un campo requerido'
        }),
    empleado: Joi.string()
        .length(24)
        .hex()
        .required()
        .messages({
            'string.base': 'El empleado debe ser un ID válido',
            'string.length': 'El ID del empleado debe tener 24 caracteres',
            'any.required': 'El empleado es un campo requerido'
        }),
    estado: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'El estado debe ser un valor booleano',
            'any.required': 'El estado es un campo requerido'
        }),
    roles: Joi.array()
        .items(Joi.string().length(24).hex())
        .optional()
        .messages({
            'array.base': 'Los roles deben ser un arreglo de IDs válidos',
            'string.length': 'Cada ID de rol debe tener 24 caracteres'
        })
});

// Exportar la validación
module.exports = { usuarioSchemaValidation };
