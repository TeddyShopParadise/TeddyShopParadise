const mongoose = require('mongoose');

// Define el esquema para la colección Historial_Precio
const historialPrecioSchema = new mongoose.Schema({
  precio: {
    type: mongoose.Schema.Types.Decimal128, // Usamos Decimal128 para representar valores decimales con precisión
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  estadoPrecio: {
    type: Boolean, // Usamos Boolean para representar valores BIT en SQL Server
    required: true
  },
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', // Relación muchos a uno con Producto
    required: true
  }
}, {
  collection: 'Historial_Precio',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('HistorialPrecio', historialPrecioSchema);
