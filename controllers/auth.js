const {response} = require('express'); //Aconsejable para tener la ayuda con res.
const {validationResult} = require('express-validator');
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { name, email, password } = req.body;

    /* Ejemplo de validación básica sin express-validator
    if(name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe de tener más de 5 letras bastardo hijo de 1000 putas'
        });
    }
        */
    try {
        
        let usuario = await Usuario.findOne({email});

        
        console.log(usuario);
        if(usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya esta en uso',
            })
        }
        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();//10 vueltas x defecto
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        const token = await generarJwt(usuario._id, usuario.name);
        
        res.status(201).json({
            ok: true,
            msg: 'create',
            id: usuario._id,
            name: usuario.name,
            token
            
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: hable con el administrador'
        });
    }
}


const loginUsuario = async (req, res = response) => {
    
    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email});

        if(!usuario) {
            res.status(400).json({
                ok: false,
                msg: 'Usuario no existe',
            });
        }

        //Confirmar pwd
        const validPwd = bcrypt.compareSync(password, usuario.password);

        if(!validPwd) {
            res.status(400).json({
                ok: false,
                msg: 'Credenciales no válidas',
            });
        }

        //Generar JWT
        const token = await generarJwt(usuario._id, usuario.name);

        res.json({
            ok: true,
            msg: 'login',
            id: usuario._id,
            name: usuario.name,
            token,
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: hable con el administrador'
        });
    }

}

const renovarToken =  async (req, res = response) => {

    const {uid, name} = req;

    const token = await generarJwt(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
        
    });
}



module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken,
}