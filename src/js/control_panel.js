import SocketsModules from "./class/socketsModules.js";
import serverConfig from "../config/config.js";
/**
 * Objeto de Socket.IO que representa la conexión de Socket.IO.
 * @type {SocketIOClient.Socket} socket
 */
const socket = io(`${serverConfig.serverUrl}:${serverConfig.serverPort}`);

/**
 * Instancia de la clase SocketsModules.
 * @type {SocketsModules} socketModule
 */
const socketModule = new SocketsModules(socket);

/**
 * Establece los controladores de eventos para recibir valores y acciones de MQTT para un módulo específico a través de socket.io.
 * @param {string} inputValueId - El ID del campo de entrada para el valor del módulo.
 * @param {string} inputActionId - El ID del campo de entrada para la acción del módulo.
 * @param {string} module - El nombre del módulo.
 */
socketModule.listenerModule("label_stove_temp", "switchStove", "stove");
socketModule.listenerModule("label_scale_weight", "switchScale", "weight");
socketModule.listenerModule("label_fire_percent", null, "smoke");
socketModule.listenerModule(null, "switchSmoke", "extractor");

/**
 * Establece los controladores de eventos para enviar acciones de MQTT para un módulo específico a través de socket.io.
 * @param {string} action - La action a emitir.
 * @param {string} module - El nombre del módulo.
 */
$("#switchStove").on("change", () =>
	socketModule.triggerModule(
		$("#switchStove").prop("checked") ? "on" : "off",
		"stove"
	)
);
$("#switchScale").on("change", () =>
	socketModule.triggerModule(
		$("#switchScale").prop("checked") ? "on" : "off",
		"weight"
	)
);
$("#switchSmoke").on("change", () =>
	socketModule.triggerModule(
		$("#switchSmoke").prop("checked") ? "on" : "off",
		"extractor"
	)
);
/**
 * Establece los controladores de eventos para enviar acciones de MQTT para un módulo específico a través de socket.io.
 * @param {string} temperature - La temperatura a emitir.
 */
$("#btn_setTemperature").on("click", () =>
	socketModule.setTemperatureStove($("#input_temp_stove").val())
);
