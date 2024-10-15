const mongoose = require('mongoose');

// Define el esquema para la colección Compañia
const compañiaSchema = new mongoose.Schema({
  NIT: {
    type: Number, // INTEGER en SQL
    required: true
  },
  telefonoEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  nombreEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  direccionEmpresa: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  catalogos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Catalogo
    ref: 'Catalogo'
  }],
  empleados: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Empleado
    ref: 'Empleado'
  }]
}, {
  collection: 'Compañia',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Compañia', compañiaSchema);
