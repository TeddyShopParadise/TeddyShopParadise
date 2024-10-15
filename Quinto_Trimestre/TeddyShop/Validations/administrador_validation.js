// validaciones/administradorValidation.js
const Joi = require('@hapi/joi');

const administradorSchemaValidation = Joi.object({
    dniEmpleado: Joi.number()
        .integer()
        .required()
        .messages({
            'number.base': 'El DNI del empleado debe ser un número',
            'number.integer': 'El DNI del empleado debe ser un número entero',
            'any.required': 'El DNI del empleado es un campo requerido'
        })
        .custom((value, helpers) => {
            if (value <= 0) {
                return helpers.message('El DNI del empleado debe ser un número positivo');
            }
            return value;
        }),
});

module.exports = { administradorSchemaValidation };
