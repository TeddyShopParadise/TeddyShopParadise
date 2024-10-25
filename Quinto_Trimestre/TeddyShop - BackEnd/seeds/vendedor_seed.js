//Semillas del vendedor

const Vendedor = require('../models/vendedor_model'); 

const vendedorSeed = {
  dniEmpleado: 987658794321, // Reemplaza con un DNI único
  codigoVendedor: 'VEN0000', // Código del vendedor (asegúrate de que sea único)
  empleado: '671b16b32ca3c8ba116f903c' 
};

// Verificar si el vendedor ya existe
Vendedor.findOne({ dniEmpleado: vendedorSeed.dniEmpleado })
  .then(existingVendedor => {
    if (existingVendedor) {
      throw new Error(`El vendedor con DNI ${vendedorSeed.dniEmpleado} ya existe.`);
    } else {
      return Vendedor.create(vendedorSeed);
    }
  })
  .then(() => console.log('Vendedor insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = vendedorSeed;
