const express = require('express');

const { obtenerEventos, crearEvento, modificarEvento, eliminarEvento } = require("../controllers/events");
const { validatJwt } = require('../middlewares/validar_jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar_campos');
const isDate = require('../helpers/isDate');

const router = express.Router()

/*
    Events routes
    /api/events/
*/

router.use(validatJwt)

router.get('/', obtenerEventos);

router.post('/', 
        [
            check('title', 'El título es obligatorio').not().isEmpty(),
            check('start', 'La fecha inicial es obligatoria').custom(isDate),
            check('end', 'La fecha final es obligatoria').custom(isDate),
            validarCampos,
        ],
         crearEvento);

router.put('/:id', modificarEvento);

router.delete('/:id', eliminarEvento);



module.exports = router;