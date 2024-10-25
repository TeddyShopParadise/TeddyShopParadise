const mongoose = require('mongoose');

// Define el esquema para la colección Pedido
const pedidoSchema = new mongoose.Schema({
  tamañoOso: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  nombreComprador: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  numeroComprador: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  nombreAgendador: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  numeroAgendador: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  localidad: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  direccion: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  barrio: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente', // Referencia a la colección Cliente
    required: true
  },
  apellidoAgendador: {
    type: String, // NVARCHAR en SQL
  },
  apellidoComprador: {
    type: String, // NVARCHAR en SQL
  },
  detallesPedido: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DetallePedido' // Referencia a la colección DetallePedido
  }],
  facturas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Factura' // Referencia a la colección Factura
  }],
  vendedores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendedor' // Referencia a la colección Vendedor
  }]
}, {
  collection: 'Pedido',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Pedido', pedidoSchema);
