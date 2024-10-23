//Semillas del categoria

const Categoria = require('../models/categoria_model'); // Asegúrate de ajustar la ruta del modelo

const categoriaSeed = {
  nombreCategoria: 'Peluches 80cm',
  descripcionCategoria: 'Categoría dedicada a todos los tipos de peluches.',
  productos: [] // Si tienes IDs de Producto, agréguelos aquí
};

// Verificar si la categoría ya existe en la base de datos
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
