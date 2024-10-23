const Cliente = require('../models/cliente_model'); // Asegúrate de ajustar la ruta del modelo

const clienteSeed = {
  dniCliente: 98765432,
  nombreCliente: 'Ana Gómez',
  telefonoCliente: '3145678901',
  fechaNacimientoCliente: new Date('1985-05-15'),
  apellidoCliente: 'Gómez', // Campo opcional
  pedidos: [], // Si tienes IDs de Pedido, agréguelos aquí
  facturas: [] // Si tienes IDs de Factura, agréguelos aquí
};

// Verificar si el DNI ya existe en la base de datos
Cliente.findOne({ dniCliente: clienteSeed.dniCliente })
  .then(existingCliente => {
    if (existingCliente) {
      throw new Error(`El cliente con DNI ${clienteSeed.dniCliente} ya existe en la base de datos.`);
    } else {
      return Cliente.create(clienteSeed);
    }
  })
  .then(() => console.log('Cliente insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = clienteSeed;
