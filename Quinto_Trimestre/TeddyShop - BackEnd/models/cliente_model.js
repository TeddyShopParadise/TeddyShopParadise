const mongoose = require('mongoose');

// Define el esquema para la colección Cliente
const clienteSchema = new mongoose.Schema({
  dniCliente: {
    type: Number, // INTEGER en SQL
    required: true
  },
  nombreCliente: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  telefonoCliente: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  fechaNacimientoCliente: {
    type: Date, // DATE en SQL
    required: true
  },
  apellidoCliente: {
    type: String, // NVARCHAR en SQL
    required: false // Campo opcional
  },
  pedidos: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Pedido por ObjectId
    ref: 'Pedido' // Relación uno a muchos con Pedido
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Factura por ObjectId
    ref: 'Factura' // Relación uno a muchos con Factura
  }]
}, {
  collection: 'Cliente',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Cliente', clienteSchema);
