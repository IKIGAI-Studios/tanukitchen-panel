import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import Recipe from "../models/recipeModel.js";

dotenv.config();

// Crear un objeto de configuración para la API de GPT-3
const configuration = new Configuration({
	apiKey: process.env.API_KEY_CHATGPT,
});
// Crear un objeto de la API de GPT-3
const openai = new OpenAIApi(configuration);

/**
 * Módulo que implementa el socket para el chat de GPT.
 * @param {SocketIO.Server} io - El servidor de Socket.IO.
 */
export default function socketChatGPT(io) {
	/**
	 * Callback que se ejecuta cuando se establece la conexión de Socket.IO.
	 * @event connection
	 * @param {Object} socket - Objeto de Socket.IO que representa la conexión de Socket.IO.
	 */
	io.on("connection", (socket) => {
		// Evento que se ejecuta cuando se recibe un mensaje de respuesta del servidor.
		socket.on("client:chat-gpt", async ({ mensaje }, callback) => {
			try {
				// Obtener todas las recetas
				const recipes = await Recipe.find();
				// Obtener un array de nombres de recetas
				const recipeNames = recipes.map((recipe) => recipe.name);
				// Unir el array de nombres de recetas en un string separado por comas
				const recipeNamesString = recipeNames.join(", ");
				mensaje =
					"El siguiente mensaje es una duda de un usuario al cual le pregunta a un asistente de cocina virtual y todas las preguntas deben de ser contestadas en el entorno de una cocina, el asistente se llama takito de Tanukitchen, y el usuario pregunta: " +
					", si te llegan a preguntar algo sobre alguna receta estas son las disponibles: " +
					recipeNamesString +
					", eso mencionalo solo si estan interesados en cocinar algo, si te preguntan por otra comida di que ahorita solo tenemos esas recetas pero que despues agregaremos mas, el usuario pregunta: " +
					mensaje +
					" y el asistente de cocina virtual responde:";
				// Obtener respuesta de la API a través de socket.io por una promesa
				const completion = await openai.createCompletion({
					model: "text-davinci-003",
					prompt: mensaje,
					max_tokens: 3000,
				});
				// Enviar la respuesta a través de socket.io
				callback({
					mensaje: completion.data.choices[0].text,
					status: true,
				});
			} catch (error) {
				// Enviar el error a través de socket.io
				callback({
					mensaje: error,
					status: false,
				});
			}
		});
	});
}
