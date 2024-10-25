const mongoose = require('mongoose');

// Define el esquema para la colección Administrador
const administradorSchema = new mongoose.Schema({
  dniEmpleado: {
    type: Number, // INTEGER en SQL
    required: true,
    unique: true, // Clave primaria, debe ser única
    ref: 'Empleado' // Relación uno a uno con Empleado
  }
}, {
  collection: 'Administrador',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Administrador', administradorSchema);
