const Empleado = require('../models/empleado_model'); // Asegúrate de ajustar la ruta del modelo

const empleadoSeed = {
  dniEmpleado: 12345978,
  telefonoEmpleado: '3112345678',
  codigoEmpleado: 'EMP001',
  fechaNacimientoEmpleado: new Date('1990-01-01'),
  nombreEmpleado: 'Juan Pérez',
  compania: '60d5f4847c31a91b8c8b4567', // Reemplaza con un ID válido de Compañia
  administrador: null, // Si tienes un ID de Administrador, reemplázalo aquí
  usuario: null, // Si tienes un ID de Usuario, reemplázalo aquí
  vendedor: null, // Si tienes un ID de Vendedor, reemplázalo aquí
  vendedorPedidos: [], // Si tienes IDs de Vendedor_Pedido, agréguelos aquí
  vendedorCatalogos: [] // Si tienes IDs de Vendedor_Catalogo, agréguelos aquí
};

// Verificar si el DNI ya existe en la base de datos
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
