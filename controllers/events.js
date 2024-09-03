const { response } = require("express");
const Evento = require("../model/Evento");

const obtenerEventos = async (req, res = response) => {

    //Populate para las refernecias y en el array lo que se quiere mostrar en el JSON
    const eventos = await Evento.find().populate('user', ['name', 'email']);

    return res.status(200).json({
        ok: true,
        eventos,
    });
}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    try{
        evento.user = req.uid;

        const eventoSalvado = await evento.save();

        return res.status(201).json({
            ok: true,
            evento: eventoSalvado,
        })
    }
    catch(error){

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });

    }

}

const modificarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    console.log(eventoId);

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
            return res.status(404).json({
            
                ok: false,
                msg: 'Id de evento inexistente',
            });
        }

        //Solo puede modificar el evento el propio usuario
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
            
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //Parámetros del final para que devuelva el evento ya modificado.
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        return res.status(202).json({
            ok: true,
            evento: eventoActualizado,
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            
            ok: false,
            msg: 'Hable con el administrador',
        });
    }

   
}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    console.log(eventoId);

    try {
        const evento = await Evento.findById(eventoId);

        if(!evento) {
            return res.status(404).json({
            
                ok: false,
                msg: 'Id de evento inexistente',
            });
        }

        //Solo puede modificar el evento el propio usuario
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
            
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

       
        await Evento.findByIdAndDelete(eventoId);

        return res.status(203).json({
            ok: true,
            
        })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}



module.exports = {
    obtenerEventos,
    crearEvento,
    modificarEvento,
    eliminarEvento,
}