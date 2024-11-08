const mongoose = require('mongoose');
const Empleado = require('../models/empleado_model'); 

const empleadoSeed = [
  {
    _id: new mongoose.Types.ObjectId('64df1aa21e2c3d5f7a8b1e4c'), // ID manual
    dniEmpleado: 123090978,
    telefonoEmpleado: '3112345678',
    codigoEmpleado: 'EMP000',
    fechaNacimientoEmpleado: new Date('1990-01-01'),
    nombreEmpleado: 'Juan Pérez(Admin)',
    compania: '60d5f4847c31a91b8c8b4567', // ID válido de Compañia
    usuario: null, 
    vendedor: null,
    vendedorPedidos: [], 
    vendedorCatalogos: [] 
  },
  {
    _id: new mongoose.Types.ObjectId('64df1ab31f5d4b6e9c7e2d1a'), // Otro ID manual
    dniEmpleado: 456789012,
    telefonoEmpleado: '3123456789',
    codigoEmpleado: 'EMP001',
    fechaNacimientoEmpleado: new Date('1985-05-15'),
    nombreEmpleado: 'María López(Empleado)',
    compania: '60d5f4847c31a91b8c8b4567', // ID válido de Compañia
    usuario: null, 
    vendedor: null,
    vendedorPedidos: [], 
    vendedorCatalogos: [] 
  }
];

// Función para insertar empleados si no existen
const insertEmpleados = async () => {
  try {
    for (const empleado of empleadoSeed) {
      const existingEmpleado = await Empleado.findOne({ dniEmpleado: empleado.dniEmpleado });
      if (existingEmpleado) {
        console.log(`El empleado con DNI ${empleado.dniEmpleado} ya existe en la base de datos.`);
      } else {
        await Empleado.create(empleado);
        console.log(`Empleado "${empleado.nombreEmpleado}" insertado correctamente.`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

insertEmpleados();

module.exports = empleadoSeed;
