//Semillas del devoluciones

const Devoluciones = require('../models/devoluciones_model'); // Ajusta la ruta del modelo

const devolucionesSeed = {
  detalleDevolucion: 'Devolución de producto defectuoso', // Detalle de la devolución
  inventarios: [] // Aquí puedes agregar IDs de inventarios si los tienes
};

// Verificar si la devolución ya existe
Devoluciones.findOne({ detalleDevolucion: devolucionesSeed.detalleDevolucion })
  .then(existingDevolucion => {
    if (existingDevolucion) {
      throw new Error(`La devolución con detalle "${devolucionesSeed.detalleDevolucion}" ya existe.`);
    } else {
      return Devoluciones.create(devolucionesSeed);
    }
  })
  .then(() => console.log('Devolución insertada correctamente'))
  .catch(err => console.error('Error:', err.message));

module.exports = devolucionesSeed;