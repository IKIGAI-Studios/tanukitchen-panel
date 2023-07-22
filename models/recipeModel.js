import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true },
	kcal: { type: String, required: true },
	carbs: { type: String, required: true },
	protein: { type: String, required: true },
	people: { type: String, required: true },
	ingredients: [
		{
			id_ingr: { type: Number, required: true },
			name: { type: String, required: true },
			amount: { type: Number, required: true },
			measure: { type: String, required: true },
		},
	],
	steps: [
		{
			id_step: { type: Number, required: true },
			verb: { type: String, required: true },
			instructions: [
				{
					do: { type: String, required: true },
					module: { type: String, required: true },
					goal: { type: Number, required: true },
				},
			],
			ingredients: [{ type: Number, required: true }],
			module: [{ type: String, required: true }],
		},
	],
});

export default model("recipes", recipeSchema);
