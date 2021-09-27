const mongoose = require('mongoose');

const conexion = async () =>{

    try {
        
        await mongoose.connect(process.env.DB_CONECTION,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        console.log('conectado a la base de datos');

    } catch (error) {
        console.log(error);
        throw new Error('ocurrio un error al conectarse a la base de datos');
    }
}

module.exports = {
    conexion
}