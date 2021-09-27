const { Schema, model } = require('mongoose');

//creando el esquema de la tabla en mongo
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        default: '/usuario/imagen/user1'
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    }
})

//personalizar _id que nos devuelve mongo, se puede dejar perfectamente con el _id y no pasaria nada,
//pero para tenerlo mas vistos lo reemplazare por uid

//usamos una function normal para poder usar el this
UsuarioSchema.method('toJSON', function(){
    const {_id, ...Object } = this.toObject();//toObject ya es metodo propio de mongo
    Object.uid = _id;

    //retornamos los nuevos datos, esto no afectaria a la base de datos estos es solo para los metodos find
    return Object; 
})

//exportando el modelo, para que podamos crear usuario desde otro acchivo, al modelo le indicamos
//que tendra como nombre Usuario en la base de datos, el schema que va utilizar es el UsuarioSchema.
module.exports = model('Usuario', UsuarioSchema);