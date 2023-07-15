import { Schema, model } from 'mongoose';
const kitchenSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

export default model('kitchens', kitchenSchema);