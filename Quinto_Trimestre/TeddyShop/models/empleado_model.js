const mongoose = require('mongoose');

// Define el esquema para la colección Empleado
const empleadoSchema = new mongoose.Schema({
  dniEmpleado: {
    type: Number,
    required: true,
    unique: true // Atributo único, no como clave primaria
  },
  telefonoEmpleado: {
    type: String,
    required: true
  },
  codigoEmpleado: {
    type: String,
    required: true
  },
  fechaNacimientoEmpleado: {
    type: Date,
    required: true
  },
  nombreEmpleado: {
    type: String,
    required: true
  },
  compania: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compañia', // Relación uno a muchos con Compañia
    required: true
  },
  administrador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Administrador' // Relación uno a uno con Administrador
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario' // Relación uno a uno con Usuario
  },
  vendedor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor' // Relación uno a uno con Vendedor
  },
  vendedorPedidos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Vendedor_Pedido
    ref: 'Vendedor_Pedido'
  }],
  vendedorCatalogos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación uno a muchos con Vendedor_Catalogo
    ref: 'Vendedor_Catalogo'
  }]
}, {
  collection: 'Empleado',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Empleado', empleadoSchema);
