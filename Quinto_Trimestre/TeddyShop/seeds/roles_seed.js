//Semillas del roles

const Roles = require('../models/roles_model'); 

const rolesSeed = {
  estado: true, // Estado del rol
  nombre: 'Administrador', // Nombre del rol
  usuarios: [] // Aquí puedes agregar IDs de usuarios si los tienes
};

// Verificar si el rol ya existe
Roles.findOne({ nombre: rolesSeed.nombre })
  .then(existingRole => {
    if (existingRole) {
      throw new Error(`El rol "${rolesSeed.nombre}" ya existe.`);
    } else {
      return Roles.create(rolesSeed);
    }
  })
  .then(() => console.log('Rol insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = rolesSeed;
