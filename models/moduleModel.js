const mongoose = require('mongoose');
const moduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('modules', moduleSchema);