const express = require('express');
const {check} = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar_campos');
const { validatJwt } = require('../middlewares/validar_jwt');
const router = express.Router();

/*
    RUTAS USUARIOS
    /api/auth/
*/

router.post('/new', 
    [
        check('name', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'introduce email valido').isEmail(),
        check('password', 'password de 6 o más caracteres').isLength({min: 6}),
        validarCampos,
    ], //middelwares que solo afectan a esta ruta
    crearUsuario);

router.post('/', 
    [
        check('email', 'introduce email valido').isEmail(),
        check('password', 'password de 6 o más caracteres').isLength({min: 6}),
        validarCampos,
    ],
    loginUsuario);

router.get('/renew', [
    validatJwt,
],renovarToken);

module.exports = router;