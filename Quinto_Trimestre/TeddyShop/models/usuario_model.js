const mongoose = require('mongoose');

// Define el esquema para la colección Usuario
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String, // NVARCHAR en SQL
    required: true,
    unique: true // Asegura que el email sea único
  },
  telefono: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  contraseña: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  username: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado', // Referencia a la colección Empleado
    required: true
  },
  estado: {
    type: Boolean, // BIT en SQL
    required: true
  },
  roles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles' // Referencia a la colección Roles
  }]
}, {
  collection: 'Usuario',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
