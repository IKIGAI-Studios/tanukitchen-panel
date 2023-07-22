import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();
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
				// Crear un objeto de configuración para la API de GPT-3
				const configuration = new Configuration({
					apiKey: process.env.API_KEY_CHATGPT,
				});
				// Crear un objeto de la API de GPT-3
				const openai = new OpenAIApi(configuration);
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
