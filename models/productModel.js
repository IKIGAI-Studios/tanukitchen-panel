const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: false
    },
    estatus: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('producto', productSchema);