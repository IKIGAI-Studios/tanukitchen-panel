const mongoose = require('mongoose');

const connectMongoDB = () => {
    const linkMongoDB = 'mongodb+srv://root:root@tanukichitos.7nzt92l.mongodb.net/?retryWrites=true&w=majority'
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