import { Schema, model } from 'mongoose';
const moduleSchema = new Schema({
    name: { type: String, required: true },
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

export default model('modules', moduleSchema);