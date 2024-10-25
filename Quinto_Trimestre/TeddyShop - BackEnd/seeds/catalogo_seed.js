const Catalogo = require('../models/catalogo_model'); 

const catalogoSeed = {
  nombreCatalogo: 'Catálogo de Peluches',
  descripcionCatalogo: 'Un catálogo exclusivo de peluches de todos los tamaños.',
  disponibilidadCatalogo: true,
  estiloCatalogo: 'Infantil',
  compania: '60d5f4847c31a91b8c8b4567', //ID válido de Compañia
  productos: [], // Si tienes IDs de Producto, agréguelos aquí
  vendedoresCatalogo: [] // Si tienes IDs de Vendedor, agréguelos aquí
};

// Verificar si el nombre del catálogo ya existe en la base de datos
Catalogo.findOne({ nombreCatalogo: catalogoSeed.nombreCatalogo })
  .then(existingCatalogo => {
    if (existingCatalogo) {
      throw new Error(`El catálogo con el nombre "${catalogoSeed.nombreCatalogo}" ya existe en la base de datos.`);
    } else {
      return Catalogo.create(catalogoSeed);
    }
  })
  .then(() => console.log('Catálogo insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = catalogoSeed;
