const express = require('express');
const cors = require('cors');
const pkg = require('./package.json');
require('dotenv').config();

const { conexion } = require('./src/database/config');

//creando la inicializacion del servidor
const app = express();

//configurando cors
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//conexion a la base de datos
conexion();


//setiando los datos para poder usarlo
app.set('pkg',pkg);

//responiendo con datos de la api al visitar la ruta raiz
app.get('/',(req, res) =>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

//ruta principal de la api
const routes = require('./src/routes/rutas.routes');
app.use('/api', routes);

//levantando el servidor
app.listen( process.env.PORT, ()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
})

