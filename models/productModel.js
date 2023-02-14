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
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    estatus: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('user', userSchema);