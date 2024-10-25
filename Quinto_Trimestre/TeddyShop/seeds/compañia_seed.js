const Compañia = require('../models/compañia_model'); 

const compañiaSeed = {
  NIT: 1033803030,
  telefonoEmpresa: '3103221166',
  nombreEmpresa: 'Peluches.oso',
  direccionEmpresa: 'Calle 46  3B - 47',
  catalogos: [], // Aquí deberías agregar las referencias a los IDs de los catálogos si los tienes
  empleados: []  // Aquí deberías agregar las referencias a los IDs de los empleados si los tienes
};

// Verificar si el NIT ya existe en la base de datos
Compañia.findOne({ NIT: compañiaSeed.NIT })
  .then(existingCompañia => {
    if (existingCompañia) {
      throw new Error(`La compañía con NIT ${compañiaSeed.NIT} ya existe en la base de datos.`);
    } else {
      return Compañia.create(compañiaSeed);
    }
  })
  .then(() => console.log('Compañia insertada correctamente'))
  .catch(err => console.error('Error:', err.message));

  module.exports = compañiaSeed;