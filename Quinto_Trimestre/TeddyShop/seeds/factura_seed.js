//Semillas del factura

const Factura = require('../models/factura_model'); // Asegúrate de ajustar la ruta del modelo

const facturaSeed = {
  fechaCreacionFactura: new Date(),
  horaCreacionFactura: new Date().toLocaleTimeString(), // Formato de hora actual
  pedido: ['67180ae2e3ebf5bd0a1e3302'], // Reemplaza con un ID válido de Pedido
  cliente: ['6718250470b162afd002a79a'], // Reemplaza con un ID válido de Cliente
  detallesFactura: ['671824ea70b162afd002a797'], // Si tienes IDs de DetalleFactura, agréguelos aquí
  metodoPago: ['67182287e2f1094696653eb8'] // Reemplaza con un ID válido de Metodo_Pago
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
