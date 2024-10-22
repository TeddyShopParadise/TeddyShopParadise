const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventarioSchema = new Schema({
    idInventario: {
        type: Number,
        required: false,
        unique: true 
    },
    stockMinimo: {
        type: String,
        maxlength: 256,
        required: true
    },
    precioVenta: {
        type: mongoose.Schema.Types.Decimal128,
        precision: 3 
    },
    precioCompra: {
        type: mongoose.Schema.Types.Decimal128,
        precision: 3 
    },
    stock: {
        type: String,
        maxlength: 256,
        required: true
    },
    stockMaximo: {
        type: String,
        maxlength: 256,
        required: true
    },
    idDevolucion: {
        type: Schema.Types.ObjectId,
        ref: 'Devoluciones', 
        required: false
    },
    productoIdProducto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto', 
        required: true
    },
    detalleFacturas: [{
        type: Schema.Types.ObjectId,
        ref: 'DetalleFactura' 
    }],
    movimientos: [{
        type: Schema.Types.ObjectId,
        ref: 'Movimiento' 
    }]
}, { 
    collection: 'Inventario' 
});

module.exports = mongoose.model('Inventario', inventarioSchema);
