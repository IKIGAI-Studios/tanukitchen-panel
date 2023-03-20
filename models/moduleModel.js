const mongoose = require('mongoose');
const moduleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    values: [{
        date: { type: Date, required: true },
        value: { type: Number, required: true },
    }],
    target: { type: Number, required: true },
    active: { type: Boolean, required: true },
    activations: { type: Number, required: true },
    id_kitchen: { type: String, required: true }, 
    max_active: {
        startTime: Date,
        endTime: Date,
        seconds: Number
    },
    time_usage: {
        startTime: Date,
        endTime: Date,
        seconds: Number
    },
});

module.exports = mongoose.model('modules', moduleSchema);