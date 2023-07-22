/**
 * Clase que maneja los módulos de sockets para recibir valores y acciones de MQTT a través de socket.io.
 */
export default class SocketsModules {
	/**
	 * Crea una instancia de la clase SocketsModules.
	 * @param {SocketIOClient.Socket} socket - El socket de socket.io.
	 */
	constructor(socket) {
		this.socket = socket;
	}

	/**
	 * Enumeración de los módulos.
	 * @property {string} STOVE - Estufa.
	 * @property {string} SMOKE - Humo.
	 * @property {string} WEIGHT - Peso.
	 * @property {string} EXTRACTOR - Extractor.
	 */
	static modules = {
		STOVE: "STOVE",
		SMOKE: "SMOKE",
		WEIGHT: "WEIGHT",
		EXTRACTOR: "EXTRACTOR",
	};

	/**
	 * Establece los controladores de eventos para recibir valores y acciones de MQTT para un módulo específico a través de socket.io.
	 * @param {string} inputValueId - El ID del campo de entrada para el valor del módulo.
	 * @param {string} inputActionId - El ID del campo de entrada para la acción del módulo.
	 * @param {string} module - El nombre del módulo.
	 */
	listenerModule(inputValueId, inputActionId, module) {
		// Validar que el módulo no sea el extractor
		if (module.toUpperCase() != SocketsModules.modules.EXTRACTOR) {
			/**
			 * Evento oyente para el evento "server:mqtt:${module}:value".
			 * Actualiza el valor del campo de entrada correspondiente con el mensaje recibido.
			 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
			 * @param {string} res.message - El mensaje recibido.
			 */
			this.socket.on(`server:mqtt:${module}:value`, ({ message }) => {
				$(`#${inputValueId}`).text(message);
			});
		}

		// Validar que el módulo no sea el smoke
		if (module.toUpperCase() != SocketsModules.modules.SMOKE) {
			/**
			 * Evento oyente para el evento "server:mqtt:${module}:action".
			 * Actualiza el estado del interruptor correspondiente según el mensaje recibido.
			 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
			 * @param {string} res.message - El mensaje recibido.
			 */
			this.socket.on(`server:mqtt:${module}:action`, ({ message }) => {
				// if message === "on" then true else false
				$(`#${inputActionId}`).prop("checked", message === "on");
			});
		}
	}

	/**
	 * Emite un evento para enviar un mensaje MQTT a través de socket.io.
	 * @param {string} action - La action a emitir.
	 * @param {string} module - El nombre del módulo.
	 */
	triggerModule(action, module) {
		/**
		 * Evento emitido para enviar un mensaje MQTT a través de socket.io.
		 * @event client:mqtt:${module}:action
		 */
		this.socket.emit(`client:mqtt:${module}:action`, action);
	}

	/**
	 * Emite un evento para enviar un mensaje MQTT a través de socket.io.
	 * @param {string} temperature - La temperatura a emitir.
	 */
	setTemperatureStove(temperature) {
		/**
		 * Evento emitido para enviar un mensaje MQTT a través de socket.io.
		 * @event client:mqtt:stove:temperature
		 */
		this.socket.emit(`client:mqtt:stove:temperature`, temperature);
	}
}
