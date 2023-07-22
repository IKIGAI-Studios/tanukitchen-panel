import VoiceChatGPT from "./class/voiceChatGPT.js";
import serverConfig from "../config/config.js";
import bsAlert from "./components/bsAlert.js";
/**
 * Objeto de Socket.IO que representa la conexión de Socket.IO.
 * @type {SocketIOClient.Socket} socket
 */
const socket = io(`${serverConfig.serverUrl}:${serverConfig.serverPort}`);
const voiceChatGPT = new VoiceChatGPT(socket, bsAlert);

/**
 * Evento que se ejecuta cuando se recibe un mensaje de respuesta del servidor.
 */

$("#btn_chatGPT").on('click', () => {
	// Iniciar grabación
	voiceChatGPT.startRecord();
});

alert('BUSCAR COMO VALIDAR QUE TENGAS CONEXION A INTERNET Y DESACTIVAR EL BOTON DE CHAT GPT')
