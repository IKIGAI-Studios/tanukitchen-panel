const mongoose = require('mongoose');
const stoveRegSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    kitchen: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('stoveregs', stoveRegSchema);