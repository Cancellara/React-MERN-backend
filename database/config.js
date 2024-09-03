const {  mongoose } = require("mongoose");

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('BBDD online')
    }
    catch(error)
    {
        console.log(error);
        throw new Error('No se puede conectar a la BBDD');
    }
}


module.exports = {
    dbConnection,
}