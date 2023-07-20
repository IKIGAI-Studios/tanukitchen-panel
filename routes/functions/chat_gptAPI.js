import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

/**
 * Hace una petición a la API de GPT-3 para obtener una respuesta a partir de un mensaje
 * @param {string} msj Recibe el mensaje del usuario para ser procesado por el modelo de GPT-3
 * @returns {string} Retorna la respuesta del modelo de GPT-3
 */
export default async function executeChatGPT(msj) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.API_KEY_CHATGPT,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: msj,
      max_tokens: 3000,
    });

    return completion.data.choices[0].text;
  } catch (error) {
    throw error;
  }
}

