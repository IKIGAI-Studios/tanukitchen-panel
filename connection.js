const mongoose = require('mongoose');

const connectMongoDB = () => {
    const linkMongoDB = 'mongodb+srv://root:root@tanucluster.98dt6wk.mongodb.net/myFirstDatabase'
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