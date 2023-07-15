import { Schema, model } from 'mongoose';
const recipeSchema = new Schema({
    recipe: {
        type: String,
        required: true
    }
});

export default model('recipes', recipeSchema);