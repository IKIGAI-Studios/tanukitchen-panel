const mongoose = require('mongoose');
require('dotenv').config();

const connectMongoDB = () => {
    const linkMongoDB = process.env.URL_MONGODB
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