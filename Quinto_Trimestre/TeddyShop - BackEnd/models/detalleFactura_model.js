const mongoose = require('mongoose');

// Define el esquema para la colección Detalle_Factura
const detalleFacturaSchema = new mongoose.Schema({
  numDetalle: {
    type: Number, // INTEGER en SQL
    required: true
  },
  precioDetalleFactura: {
    type: Number, // FLOAT o DECIMAL en SQL
    required: true
  },
  cantidadDetalleFactura: {
    type: Number, // INTEGER en SQL
    required: true
  },
  inventarioIdInventario: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Inventario por ObjectId
    ref: 'Inventario',
    required: true
  },
  productoIdProducto: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Producto por ObjectId
    ref: 'Producto',
    required: true
  },
  facturaIdFactura: {
    type: mongoose.Schema.Types.ObjectId, // Referencia a Factura por ObjectId
    ref: 'Factura',
    required: true
  }
}, {
  collection: 'Detalle_Factura',
  timestamps: false
});

// Definir el índice único compuesto para numDetalle y productoIdProducto
detalleFacturaSchema.index({ numDetalle: 1, productoIdProducto: 1 }, { unique: true });

// Crear y exportar el modelo
module.exports = mongoose.model('Detalle_Factura', detalleFacturaSchema);
