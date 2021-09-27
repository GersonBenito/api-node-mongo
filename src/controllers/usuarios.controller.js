//importando reponse  de express
const  { response } = require('express');
//importar el modelo usuario
const { db, update } = require('../models/usuario.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');


//creando endpoint obtener usuarios
const getUser = async(req, res = response) =>{
    try {

        //metodo find para obtener todos los usuarios de la base sin fitro
        const usuario  = await Usuario.find();

        //para obtener solo los datos que necesitamos se usa el el fitro del find
        //const usuario = await Usuario.find({}, 'nombre email role imagen')

        res.status(200).json({
            status:200,
            data: usuario,
            message: 'datos obtenidos correctamente'
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            message: `error al obtener datos, ${error}`
        })
    }
}

//obtener usuario por id
const getUserById = async(req, res = response) =>{
    try {
        const id = req.params.id;

        //uso del metodo findById para consulatar a la base 
        const usuario = await Usuario.findById(id);

        res.status(200).json({
            status:200,
            data: usuario,
            message:'datos obtenidos correctamente'
        })
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:`error al obtener datos ${error}`
        })
    }
}

//endpoint crear usuarios
const crearUsuario = async(req, res = response) =>{
    try {
        const data = req.body;

        //obtener el email que viene en la request
        const { email, password } = req.body;

        //consultamos a la base de datos con el metodo findOne para verficar si existe el email
        const existEmail = await Usuario.findOne({email});

        if(existEmail){
            //si el email existe retornamos el mensaje 
            return res.status(400).json({
                status:400,
                message:'el correo ya se encuentra registrado'
            })
        }

        //creamos una instanacia de usuario
        const usuario = new Usuario(data);

        //encriptar constraseña de una sola via
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardamos los datos en la base de datos con el metodo save
        await usuario.save();

        res.status(200).json({
            status:200,
            data: usuario,
            message: 'creando usuario'
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            message: `error al crear usuario ${error}`
        })
    }
}

//actualizar usuario
const actualizarUsuario = async(req, res = response) =>{
    try {
        const uid = req.params.id;

        //consultamos a la base de datos para verificar que el usuario existe y asi poder actualizarlo
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB){
            return res.status(404).json({
                status:404,
                message: `No existe un unusario con el id, ${uid}`
            })
        }

        //extraemos los campos que no queremos actualizar, por medio de la destructuracion
        const { password, email, ...data } = req.body;

        if(usuarioDB.email !== email){

            //validamos si el email existe en la base de datos
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    message: 'ya existe un usuario con ese email'
                })
            }
        }
        
        //usamos el metodo updateOne, debido   a que el metoodo findByIdAndUpdate ya esta deprecado
        await Usuario.updateOne({_id: uid}, data);

        res.status(200).json({
            status:200,
            message: `datos actualizados`
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            message: `error al actualizar datos, ${error}`
        })
    }
}

//eliminar un usuario
const eliminarUsuario = async (req, res = response) =>{
    try {
        const uid = req.params.id;

        //eliminar un usuario usando el metodo deleteOne
        await Usuario.deleteOne({_id: uid});
        res.status(200).json({
            status:200,
            message:`datos eliminado correctamente`
        })
    } catch (error) {
        res.status(400).json({
            status:400,
            message:`error al eliminar datos, ${error}`
        })
    }
}

module.exports = {
    getUser,
    crearUsuario,
    getUserById,
    actualizarUsuario,
    eliminarUsuario
}