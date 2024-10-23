//Inicializa las semillas para llamarlas en el index


// seedDatabase.js
const seedCompañia = require('./compañia_seed.js');
const empleadosSeed = require('./empleado_seed.js');
const catalogoSeed = require('./catalogo_seed.js');
const clienteSeed = require('./cliente_seed.js');
const categoriaSeed = require('./categoria_seed.js');
const detalleFacturaSeed = require('./detalleFactura_seed');
const facturaSeed = require('./factura_seed.js');
//const seedCursos = require('./seeds/curso_seed');
// Importa otros archivos de semilla...

async function runAllSeeds() {
  try {
    console.log("Iniciando proceso de semillas...");

   await seedCompañia;
   await empleadosSeed;
   await catalogoSeed;
   await clienteSeed;
   await categoriaSeed;
   await detalleFacturaSeed;
   await facturaSeed;
    // Llama a otras funciones de semilla aquí...
    
    console.log("Semillas completadas correctamente.");
  } catch (error) {
    console.error("Error al ejecutar semillas:", error);
  }
}

module.exports = runAllSeeds;
