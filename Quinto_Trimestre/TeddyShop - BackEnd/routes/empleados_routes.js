const express = require('express');
const router = express.Router();
const {
    listarEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    obtenerEmpleadoPorId,
    eliminarEmpleado
} = require('../controllers/empleado_controller'); // Importa los controladores

/**
 * @swagger
 * /empleado:
 *   get:
 *     summary: Obtiene todos los empleados
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a79"
 *                   dniEmpleado:
 *                     type: number
 *                     example: 12345678
 *                   telefonoEmpleado:
 *                     type: string
 *                     example: "555-1234"
 *                   codigoEmpleado:
 *                     type: string
 *                     example: "EMP001"
 *                   fechaNacimientoEmpleado:
 *                     type: string
 *                     format: date
 *                     example: "1990-01-01"
 *                   nombreEmpleado:
 *                     type: string
 *                     example: "Juan Pérez"
 *                   compania:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7a"
 *                   administrador:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7b"
 *                   usuario:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7c"
 *                   vendedor:
 *                     type: string
 *                     example: "60d2b6e3e6b0f99dbe0c5a7d"
 *                   vendedorPedidos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7e"
 *                   vendedorCatalogos:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "60d2b6e3e6b0f99dbe0c5a7f"
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para listar todos los empleados
router.get('/', listarEmpleados);

/**
 * @swagger
 * /empleado:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags:
 *       - Empleados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniEmpleado:
 *                 type: number
 *                 example: 12345678
 *               telefonoEmpleado:
 *                 type: string
 *                 example: "555-1234"
 *               codigoEmpleado:
 *                 type: string
 *                 example: "EMP001"
 *               fechaNacimientoEmpleado:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               nombreEmpleado:
 *                 type: string
 *                 example: "Juan Pérez"
 *               compania:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               administrador:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               usuario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               vendedor:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */


// Ruta para crear un nuevo empleado
router.post('/', crearEmpleado);

/**
 * @swagger
 * /empleado/{id}:
 *   put:
 *     summary: Actualiza un empleado por su ID
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dniEmpleado:
 *                 type: number
 *                 example: 12345678
 *               telefonoEmpleado:
 *                 type: string
 *                 example: "555-1234"
 *               codigoEmpleado:
 *                 type: string
 *                 example: "EMP001"
 *               fechaNacimientoEmpleado:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *               nombreEmpleado:
 *                 type: string
 *                 example: "Juan Pérez"
 *               compania:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7a"
 *               administrador:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7b"
 *               usuario:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7c"
 *               vendedor:
 *                 type: string
 *                 example: "60d2b6e3e6b0f99dbe0c5a7d"
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Empleado no encontrado
 */




// Ruta para actualizar un empleado por su ID
router.put('/:id', actualizarEmpleado);

/**
 * @swagger
 * /empleado/{id}:
 *   get:
 *     summary: Obtiene un empleado por su ID
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado encontrado
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para obtener un empleado por su ID
router.get('/:id', obtenerEmpleadoPorId);

/**
 * @swagger
 * /empleado/{id}:
 *   delete:
 *     summary: Elimina un empleado por su ID
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

// Ruta para eliminar un empleado por su ID
router.delete('/:id', eliminarEmpleado);

module.exports = router;
