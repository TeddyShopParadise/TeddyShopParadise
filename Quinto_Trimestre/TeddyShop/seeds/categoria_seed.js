//Semillas del categoria

const Categoria = require('../models/categoria_model'); 

const categoriaSeed = {
  nombreCategoria: 'Peluches de distintos colores',
  descripcionCategoria: 'Osos de diferentes colores',
  productos: [] // Si tienes IDs de Producto, agréguelos aquí
};

// Validación de existencia
Categoria.findOne({ nombreCategoria: categoriaSeed.nombreCategoria })
  .then(existingCategoria => {
    if (existingCategoria) {
      throw new Error(`La categoría con el nombre "${categoriaSeed.nombreCategoria}" ya existe en la base de datos.`);
    } else {
      return Categoria.create(categoriaSeed);
    }
  })
  .then(() => console.log('Categoría insertada correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = categoriaSeed;
