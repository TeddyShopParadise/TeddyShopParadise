//Semillas del inventario

const Inventario = require('../models/inventario_model'); 

const inventarioSeed = {
    idInventario: 1, // Identificador único para el inventario
    stockMinimo: '10', // Stock mínimo
    precioVenta: 29.99, // Precio de venta
    precioCompra: 19.99, // Precio de compra
    stock: '50', // Stock actual
    stockMaximo: '100', // Stock máximo
    idDevolucion: null, // ID de la devolución (si aplica)
    productoIdProducto: '60d21b4667d0d8992e610c85', // ID del producto (ajusta según tu base de datos)
    detalleFacturas: [], // Aquí puedes agregar IDs de detalles de factura si los tienes
    movimientos: [] // Aquí puedes agregar IDs de movimientos si los tienes
};

// Verificar si el inventario ya existe
Inventario.findOne({ idInventario: inventarioSeed.idInventario })
    .then(existingInventario => {
        if (existingInventario) {
            throw new Error(`El inventario con ID ${inventarioSeed.idInventario} ya existe.`);
        } else {
            return Inventario.create(inventarioSeed);
        }
    })
    .then(() => console.log('Inventario insertado correctamente'))
    .catch(err => console.error('Error:', err.message));

module.exports = inventarioSeed;
