const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    recipes_completed: {
        type: Number,
        required: true
    },
    last_recipe: {
        type: String,
        required: true
    },
    count_recipes: [
        {
            count: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    ],
    id_kitchen: {
        type: Schema.Types.ObjectId,
        ref: 'Kitchen',
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);