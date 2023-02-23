const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    recipe: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('recipes', recipeSchema);