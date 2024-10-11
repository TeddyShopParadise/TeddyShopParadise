const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');




//Conexión a la base de datos mongoDB
mongoose.connect('')
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    seedDatabase();
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));


// Middleware
const app = express();


//configuracion de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Cargar el certificado SSL y la clave privada

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Integrar las rutas de cursos
app.use('/api/administrador', administradorRoutes);


const port = process.env.PORT || 3000;

https.createServer(options, app).listen(port, () => {
  console.log(`Servidor HTTPS corriendo en https://localhost:3000`);
});
