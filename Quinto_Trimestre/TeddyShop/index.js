const express = require('express');
const mongoose = require('mongoose');
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');
const http = require('http'); // Importa el módulo http
// Si quieres usar HTTPS, también necesitas importar 'https' y cargar el certificado
// const https = require('https');
// const fs = require('fs');


// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://sa:PM02s8wkGc77jfO3@cluster0.hhmn9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    /*seedDatabase();
    */
  })
  .catch(err => console.error('Error de conexión a MongoDB:', err));


// Middleware
const app = express();

/*
// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/

// Cargar el certificado SSL y la clave privada
// Si usas HTTPS, descomenta las siguientes líneas y coloca tus certificados
/* 
const options = {
  key: fs.readFileSync('ruta/a/tu/clave-privada.key'),
  cert: fs.readFileSync('ruta/a/tu/certificado.crt')
};
*/

// Middleware adicional
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
// Integrar las rutas de cursos
app.use('/api/administrador', administradorRoutes);
*/

// Puerto
const port = process.env.PORT || 3000;

// Si usas HTTP:
http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
});

