const { response } = require("express");
const jwt = require("jsonwebtoken");

const validatJwt = (req, res = response, next) => {

    const token = req.header('x-token');
    console.log(token);

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token activo'
        }); 
    }

    try {

        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY_JWT,
        )

        console.log(payload);

        req.uid = payload.uid;
        req.name = payload.name;

    }
    catch(Error)
    {
        console.log(Error);
        res.status(401).json({
            ok: false,
            msg: 'Error validando el token'
        });
    }

    next()
}

module.exports = {
    validatJwt
}