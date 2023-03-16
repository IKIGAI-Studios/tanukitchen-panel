const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = () => {
    const linkMongoDB = process.env.MONGO_CONNECTION_LINK
    mongoose.set('strictQuery', false);
    mongoose.connect(linkMongoDB)
    .then(() => {
        console.log('Conexion correcta a mongoDB');
    })
    .catch((e) => {
        console.error(`Error ${e}`);
    });
}

module.exports = connectMongoDB;