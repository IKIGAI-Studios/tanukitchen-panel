import { Schema, model } from "mongoose";

const scaleRegSchema = new Schema({
	timestamp: {
		type: Date,
		required: true,
	},
	kitchen: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	},
});

export default model("scaleregs", scaleRegSchema);
