const express = require('express');
const router = express.Router();
const {
    listarEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    obtenerEmpleadoPorId,
    eliminarEmpleado
} = require('../controllers/empleado_controller'); // Importa los controladores

// Ruta para listar todos los empleados
router.get('/', listarEmpleados);

// Ruta para crear un nuevo empleado
router.post('/', crearEmpleado);

// Ruta para actualizar un empleado por su ID
router.put('/:id', actualizarEmpleado);

// Ruta para obtener un empleado por su ID
router.get('/:id', obtenerEmpleadoPorId);

// Ruta para eliminar un empleado por su ID
router.delete('/:id', eliminarEmpleado);

module.exports = router;
