//Semillas del detalle factura

const DetalleFactura = require('../models/detalleFactura_model'); // Asegúrate de ajustar la ruta del modelo

const detalleFacturaSeed = {
  numDetalle: 1,
  precioDetalleFactura: 29.999,
  cantidadDetalleFactura: 3,
  inventarioIdInventario: '60d5f4847c31a91b8c8b4569', // Reemplaza con un ID válido de Inventario
  productoIdProducto: '60d5f4847c31a91b8c8b4568', // Reemplaza con un ID válido de Producto
  facturaIdFactura: '60d5f4847c31a91b8c8b4578' // Reemplaza con un ID válido de Factura
};

// Verificar si el detalle ya existe en la base de datos
DetalleFactura.findOne({
  numDetalle: detalleFacturaSeed.numDetalle,
  productoIdProducto: detalleFacturaSeed.productoIdProducto
})
.then(existingDetalle => {
  if (existingDetalle) {
    throw new Error(`El detalle de factura con numDetalle ${detalleFacturaSeed.numDetalle} y producto ${detalleFacturaSeed.productoIdProducto} ya existe en la base de datos.`);
  } else {
    return DetalleFactura.create(detalleFacturaSeed);
  }
})
.then(() => console.log('Detalle de factura insertado correctamente'))
.catch(err => console.error('Error:', err.message));

module.exports = detalleFacturaSeed;
