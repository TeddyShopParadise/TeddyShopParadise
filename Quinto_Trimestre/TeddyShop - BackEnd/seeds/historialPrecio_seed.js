//Semillas del historial precio

const HistorialPrecio = require('../models/historialPrecio_model'); 

const historialPrecioSeed = {
  precio: 19.99, // Precio del producto
  fechaInicio: new Date('2024-01-01'), // Fecha de inicio
  fechaFin: new Date('2024-12-31'), // Fecha de fin
  estadoPrecio: true, // Estado del precio
  producto: '60d21b4667d0d8992e610c85' // ID del producto (ajusta según tu base de datos)
};

// Verificar si el registro ya existe
HistorialPrecio.findOne({ producto: historialPrecioSeed.producto, fechaInicio: historialPrecioSeed.fechaInicio })
  .then(existingHistorial => {
    if (existingHistorial) {
      throw new Error(`El historial de precio para el producto con ID ${historialPrecioSeed.producto} ya existe.`);
    } else {
      return HistorialPrecio.create(historialPrecioSeed);
    }
  })
  .then(() => console.log('Historial de precio insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = historialPrecioSeed;
