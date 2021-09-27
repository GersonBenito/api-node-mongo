const { Router, response } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validatCampos } = require('../middlewares/validar-campos');


//crando las subrutas
const usuario = require('../controllers/usuarios.controller');

router.get('/', usuario.getUser);
router.get('/:id', usuario.getUserById);

//para crear usuario se necesista validar que los campos no vengan vacios
//para ello usaremos un middleware de express, express-validator, estos se puede dentro del controlador sin problema,
//pero seria mucho mas trabjado dentro del controlador, un if por cada campo, 

//para poder usar middleware en la rura, se coloca como segundo argumento, para poder usar varios middleware se colococa entre [],
// y se es solo uno va solo el nombre ejemplo '/', middleware, usuario.crearUsuario
router.post('/',
    [
        check('nombre', 'El nombre es obligario').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validatCampos
    ]
 ,usuario.crearUsuario);

router.put('/:id',
    [
        check('nombre', 'El nombre es obligario').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty(),
        validatCampos
    ]
,usuario.actualizarUsuario);

router.delete('/:id', usuario.eliminarUsuario);

module.exports = router;