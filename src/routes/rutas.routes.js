const { Router } = require('express');

const router = Router();

//creando las rutas principales
const usuario = require('../routes/usuarios.router');
router.use('/usuario',usuario);

module.exports = router;