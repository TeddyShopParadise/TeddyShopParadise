//Semillas del usuario

const Usuario = require('../models/usuario_model'); 

const usuarioSeed = {
  email: 'usuario@example.com', // Reemplaza con un email único
  telefono: '3101234567', // Número de teléfono
  contraseña: 'contraseñaSegura123', // Contraseña (asegúrate de encriptarla en un entorno real)
  username: 'usuarioEjemplo', // Nombre de usuario
  empleado: '60d21b4667d0d8992e610c85', // ID del empleado (ajusta según tu base de datos)
  estado: true, // Estado del usuario
  roles: [] // Aquí puedes agregar IDs de roles si los tienes
};

// Verificar si el usuario ya existe
Usuario.findOne({ email: usuarioSeed.email })
  .then(existingUsuario => {
    if (existingUsuario) {
      throw new Error(`El usuario con email "${usuarioSeed.email}" ya existe.`);
    } else {
      return Usuario.create(usuarioSeed);
    }
  })
  .then(() => console.log('Usuario insertado correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = usuarioSeed;
