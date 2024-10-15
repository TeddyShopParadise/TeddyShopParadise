const mongoose = require('mongoose');

// Define el esquema para la colección Catalogo
const catalogoSchema = new mongoose.Schema({
  nombreCatalogo: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  descripcionCatalogo: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  disponibilidadCatalogo: {
    type: Boolean, // Atributo "DisponibilidadCatalogo"
    required: true,
    default: true
  },
  estiloCatalogo: {
    type: String, // Atributo "EstiloCatalogo"
    required: true
  },
  compania: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compañia', // Relación uno a uno con Compañia
    required: true
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId, // Relación muchos a muchos con Producto
    ref: 'Producto'
  }],
  vendedoresCatalogo: [{
    type: mongoose.Schema.Types.ObjectId, // Relación muchos a muchos con Vendedor_Catalogo
    ref: 'Vendedor_Catalogo'
  }]
}, {
  collection: 'Catalogo',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Catalogo', catalogoSchema);
