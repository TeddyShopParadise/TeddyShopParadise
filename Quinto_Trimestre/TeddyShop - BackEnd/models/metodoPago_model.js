const mongoose = require('mongoose');

// Define el esquema para la colección Metodo_Pago
const metodoPagoSchema = new mongoose.Schema({
  nombreMetodoPago: {
    type: String, // NVARCHAR en SQL se representa como String en Mongoose
    required: true
  },
  factura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura', // Referencia a la colección Factura
    required: true
  }
}, {
  collection: 'Metodo_Pago',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('MetodoPago', metodoPagoSchema);
