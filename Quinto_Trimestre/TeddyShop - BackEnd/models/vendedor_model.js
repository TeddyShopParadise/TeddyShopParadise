const mongoose = require('mongoose');

// Define el esquema para la colección Vendedor
const vendedorSchema = new mongoose.Schema({
  dniEmpleado: {
    type: Number, // INTEGER en SQL
    required: true,
    unique: true // Asegura que dniEmpleado sea único
  },
  codigoVendedor: {
    type: String, // NVARCHAR en SQL
    required: true,
    unique: true // Índice único para codigoVendedor
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado', // Referencia a la colección Empleado
    required: true
  }
}, {
  collection: 'Vendedor',
  timestamps: false
});

//exportar el modelo
module.exports = mongoose.model('Vendedor', vendedorSchema);
