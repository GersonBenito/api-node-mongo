const { response } = require('express');
const { validationResult } = require('express-validator');

//funcion para validar campos, usare el tercer parametro que se llama next para pasar de la funcion si todo esta bien
const validatCampos = (req, res = response, next) =>{

    //obtener los valores que vengan en la request
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        //si es diferente de vacio significa que si hay errores por lo tanto retornamos el error
        return res.status(400).json({
            status:400,
            message: errores.mapped()
        })
    }

    //si no hay error ejecutamos el next para pasar al siguiente middleware o para mostrar los resultados
    next();
}

//exportamos la funcion para poder usarlo en otros endpoint
module.exports = {
    validatCampos,
}