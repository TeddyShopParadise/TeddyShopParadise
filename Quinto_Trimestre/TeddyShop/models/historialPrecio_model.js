const mongoose = require('mongoose');

const historialPrecioSchema = new mongoose.Schema({
  precio: {
    type: Number, 
    required: true,
   // Setter para asegurar precisión (almacenar el número como está)
   set: v => parseFloat(v.toFixed(3)),
   // Getter para mostrar siempre con 3 decimales
   get: v => v.toFixed(3)
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
  timestamps: false,
  toJSON: { getters: true }, // Asegura que los getters se utilicen al serializar a JSON
  toObject: { getters: true } // Asegura que los getters se utilicen al convertir a objeto
});


module.exports = mongoose.model('HistorialPrecio', historialPrecioSchema);
