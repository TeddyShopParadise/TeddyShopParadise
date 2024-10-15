const mongoose = require('mongoose');

// Define el esquema para la colección Categoria
const categoriaSchema = new mongoose.Schema({
  nombreCategoria: {
    type: String, // NVARCHAR en SQL
    required: true
  },
  descripcionCategoria: {
    type: String, // NVARCHAR en SQL
    required: false
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto' // Relación muchos a muchos con Producto
  }]
}, {
  collection: 'Categoria',
  timestamps: false
});

// Crear y exportar el modelo
module.exports = mongoose.model('Categoria', categoriaSchema);
