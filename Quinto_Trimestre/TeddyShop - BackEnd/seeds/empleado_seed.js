const Empleado = require('../models/empleado_model'); 

const empleadoSeed = {
  dniEmpleado: 123090978,
  telefonoEmpleado: '3112345678',
  codigoEmpleado: 'EMP000',
  fechaNacimientoEmpleado: new Date('1990-01-01'),
  nombreEmpleado: 'Juan Pérez',
  compania: '60d5f4847c31a91b8c8b4567', // Reemplaza con un ID válido de Compañia
  usuario: null, // Si tienes un ID de Usuario, reemplázalo aquí
  vendedor: null, // Si tienes un ID de Vendedor, reemplázalo aquí
  vendedorPedidos: [], // Si tienes IDs de Vendedor_Pedido, agréguelos aquí
  vendedorCatalogos: [] // Si tienes IDs de Vendedor_Catalogo, agréguelos aquí
};

// validaciones para el id y eliminar la duplicidad
Empleado.findOne({ dniEmpleado: empleadoSeed.dniEmpleado })
  .then(existingEmpleado => {
    if (existingEmpleado) {
      throw new Error(`El empleado con DNI ${empleadoSeed.dniEmpleado} ya existe en la base de datos.`);
    } else {
      return Empleado.create(empleadoSeed);
    }
  })
  .then(() => console.log('Empleado insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = empleadoSeed;
