const mongoose = require('mongoose');

// Define el esquema para la colección Devoluciones
const devolucionesSchema = new mongoose.Schema({
  detalleDevolucion: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  inventarios: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Inventario por ObjectId
    ref: 'Inventario'
  }]
}, {
  collection: 'Devoluciones',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Devoluciones', devolucionesSchema);
