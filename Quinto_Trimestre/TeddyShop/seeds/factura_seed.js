//Semillas del factura

const Factura = require('../models/factura_model'); // Asegúrate de ajustar la ruta del modelo

const facturaSeed = {
  fechaCreacionFactura: new Date(),
  horaCreacionFactura: new Date().toLocaleTimeString(), // Formato de hora actual
  pedido: [], // Reemplaza con un ID válido de Pedido
  cliente: [], // Reemplaza con un ID válido de Cliente
  detallesFactura: [], // Si tienes IDs de DetalleFactura, agréguelos aquí
  metodoPago: [] // Reemplaza con un ID válido de Metodo_Pago
};

// Verificar si la factura ya existe en la base de datos
Factura.findOne({
  pedido: facturaSeed.pedido,
  cliente: facturaSeed.cliente
})
.then(existingFactura => {
  if (existingFactura) {
    throw new Error(`La factura para el pedido ${facturaSeed.pedido} y cliente ${facturaSeed.cliente} ya existe en la base de datos.`);
  } else {
    return Factura.create(facturaSeed);
  }
})
.then(() => console.log('Factura insertada correctamente'))
.catch(err => console.error('Error:', err.message));

module.exports = facturaSeed;
