const { Schema, model } = require("mongoose");


const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },

    notes: {
        type: String,
    },

    start: {
        type: Date,
        required: true,
    },

    end: {
        type: Date,
        required: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

});

//Para devolver solo los campos que nos interesan se reemplaza el método toJSON
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id= _id;
    return object;
})

module.exports = model('Evento', EventoSchema);
