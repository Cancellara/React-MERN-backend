const express = require('express');
const { dbConnection } = require('./database/config');
const dotenv = require('dotenv').config();
const cors = require('cors');


//Crear servidor express

const app = express();

//Conectar BBDD
dbConnection();


//CORS npm i cors
app.use(cors())


//Directorio público

//use es middelware
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})