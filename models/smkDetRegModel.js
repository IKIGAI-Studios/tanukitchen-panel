const mongoose = require('mongoose');
const smkDetRegSchema = new mongoose.Schema({
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

module.exports = mongoose.model('smkdetregs', smkDetRegSchema);