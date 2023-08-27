/**
 * Clase que se encarga de la comunicación con el servidor para el chat GPT
 * @class VoiceChatGPT
 * @property {SocketIOClient.Socket} socket - El socket de socket.io.
 * @property {function} bsAlert - Función para mostrar una alerta de Bootstrap.
 * @property {SpeechRecognition} recGPT - Objeto de reconocimiento de voz.
 * @property {function} readCommandGPT - Función que condiciona la respuesta dependiendo de el contenido de la grabación.
 * @property {function} startRecord - Función que inicia la grabación.
 */
export default class VoiceChatGPT {
	/**
	 * Crea una instancia de la clase VoiceChatGPT.
	 * @param {SocketIOClient.Socket} socket - El socket de socket.io.
	 * @param {function} bsAlert - Función para mostrar una alerta de Bootstrap.
	 * @example
	 * const voiceChatGPT = new VoiceChatGPT(socket, bsAlert);
	 * $("#btn_chatGPT").click(() => {
	 *     voiceChatGPT.startRecord();
	 * });
	 */
	constructor(socket, bsAlert) {
		const recVozGPT =
			window.SpeechRecognition || window.webkitSpeechRecognition;
		this.socket = socket;
		this.bsAlert = bsAlert;
		this.recGPT = new recVozGPT();
		this.recGPT.onstart = () => {
			console.log("Recording to send Chat GPT...");
		};
		this.recGPT.onresult = (event) => {
			let mensaje = event.results[0][0].transcript;
			console.info(mensaje);
			this.readCommandGPT(mensaje);
		};
	}

	/**
	 * Función que condiciona la respuesta dependiendo de el contenido de la grabación.
	 * @param {string} mensaje - El mensaje a enviar.
	 */
	async readCommandGPT(mensaje) {
		try {
			// Crear un objeto de reconocimiento de voz
			const voice = new SpeechSynthesisUtterance();
			// Obtener respuesta de la API a través de socket.io por una promesa
			const response = await new Promise((resolve, reject) => {
				// Emitir el evento "client:chat-gpt" con el mensaje
				this.socket.emit(`client:chat-gpt`, { mensaje }, (response) => {
					// Validar que la respuesta sea correcta
					if (!response.status)
						reject("Eror in chat GPT. Please try again later.");
					else resolve(response.mensaje);
				});
			});

			// Mostrar la respuesta en una alerta de Bootstrap
			this.bsAlert(
				`You asked: ${mensaje}. <br>Takito answered: ${response}`,
				"info"
			);
			// Establecer el texto de la voz
			voice.text = response;
			// Obtener las voces disponibles
			let voices = window.speechSynthesis.getVoices();
			// Obtener la voz de Google español
			let selectedVoice = voices.find(
				(voice) => voice.name === "Google español"
			);
			// Establecer la voz
			if (selectedVoice) voice.voice = selectedVoice;
			// Reproducir la voz
			window.speechSynthesis.speak(voice);
		} catch (error) {
			console.error("Error occurred:", error);
			// Mostrar el error en una alerta de Bootstrap
			this.bsAlert(`Error occurred: ${error}`, "danger");
		}
	}

	// Iniciar la grabación
	startRecord() {
		this.recGPT.start();
	}
}
