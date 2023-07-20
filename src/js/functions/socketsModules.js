/**
 * Clase que maneja los módulos de sockets para recibir valores y acciones de MQTT a través de socket.io.
 */
export default class SocketsModules {
	/**
	 * Crea una instancia de la clase SocketsModules.
	 */
	constructor() {
		this.socket = io("http://localhost:3000");        ;
	}

	/**
	 * Establece los controladores de eventos para recibir valores y acciones de MQTT para un módulo específico a través de socket.io.
	 * @param {string} inputValueId - El ID del campo de entrada para el valor del módulo.
	 * @param {string} inputActionId - El ID del campo de entrada para la acción del módulo.
	 * @param {string} module - El nombre del módulo.
	 */
	listenerModule(inputValueId, inputActionId, module) {
		/**
		 * Evento oyente para el evento "server:mqtt:${module}:value".
		 * Actualiza el valor del campo de entrada correspondiente con el mensaje recibido.
		 *
		 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
		 * @param {string} res.message - El mensaje recibido.
		 */
		this.socket.on(`server:mqtt:${module}:value`, ({ message }) => {
			$(`#${inputValueId}`).val(message);
		});

		/**
		 * Evento oyente para el evento "server:mqtt:${module}:action".
		 * Actualiza el estado del interruptor correspondiente según el mensaje recibido.
		 *
		 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
		 * @param {string} res.message - El mensaje recibido.
		 */
		this.socket.on(`server:mqtt:${module}:action`, ({ message }) => {
			$(`#${inputActionId}`).prop("checked", message === "on");
		});
	}
}

/**
 * Función que establece los controladores de eventos para recibir valores y acciones de MQTT a través de socket.io.
 */
export function listenerSocketsModulesBroker() {
	/**
	 * Evento oyente para el evento "server:mqtt:stove:value".
	 * Actualiza el valor del campo de entrada "#input_stove" con el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:stove:value", (res) =>
		$("#input_stove").val(res.message)
	);

	/**
	 * Evento oyente para el evento "server:mqtt:smoke:value".
	 * Actualiza el valor del campo de entrada "#input_smoke" con el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:smoke:value", (res) =>
		$("#input_smoke").val(res.message)
	);

	/**
	 * Evento oyente para el evento "server:mqtt:weight:value".
	 * Actualiza el valor del campo de entrada "#input_weight" con el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:weight:value", (res) =>
		$("#input_weight").val(res.message)
	);

	/**
	 * Evento oyente para el evento "server:mqtt:stove:action".
	 * Actualiza el estado del interruptor "#switch_stove" según el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:stove:action", (res) =>
		$("#switch_stove").prop("checked", res.message === "on")
	);

	/**
	 * Evento oyente para el evento "server:mqtt:smoke:action".
	 * Actualiza el estado del interruptor "#switch_smoke" según el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:smoke:action", (res) =>
		$("#switch_smoke").prop("checked", res.message === "on")
	);

	/**
	 * Evento oyente para el evento "server:mqtt:weight:action".
	 * Actualiza el estado del interruptor "#switch_weight" según el mensaje recibido.
	 * @param {Object} res - El objeto de respuesta que contiene el mensaje.
	 * @param {string} res.message - El mensaje recibido.
	 */
	socket.on("server:mqtt:weight:action", (res) =>
		$("#switch_weight").prop("checked", res.message === "on")
	);
}

export function setterSocketsModulesBroker() {
	$("#switch_stove").on("click", () => {
		socket.emit(
			"client:mqtt:stove:action",
			$("#switch_stove").prop("checked") ? "on" : "off"
		);
	});

	$("#switch_smoke").on("click", () => {
		socket.emit(
			"client:mqtt:smoke:action",
			$("#switch_smoke").prop("checked") ? "on" : "off"
		);
	});

	$("#switch_weight").on("click", () => {
		socket.emit(
			"client:mqtt:weight:action",
			$("#switch_weight").prop("checked") ? "on" : "off"
		);
	});
}
