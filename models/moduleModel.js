const mongoose = require('mongoose');
const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('module', moduleSchema);