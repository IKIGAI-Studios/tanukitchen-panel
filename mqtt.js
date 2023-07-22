import { connect } from "mqtt";

/**
 * Rutas MQTT para diferentes clientes y servidores.
 * @type {Object}
 * @property {Object} client - Rutas para el cliente MQTT.
 * @property {string} client.STOVE - Ruta para el cliente MQTT relacionada con la estufa.
 * @property {string} client.SMOKE - Ruta para el cliente MQTT relacionada con el humo.
 * @property {string} client.WEIGHT - Ruta para el cliente MQTT relacionada con el peso.
 * @property {Object} server - Rutas para el servidor MQTT.
 * @property {string} server.STOVE - Ruta para el servidor MQTT relacionada con la estufa.
 * @property {string} server.SMOKE - Ruta para el servidor MQTT relacionada con el humo.
 * @property {string} server.WEIGHT - Ruta para el servidor MQTT relacionada con el peso.
 */
const mqttRoutes = {
	client: {
		STOVE: "client/tanukitchen/stove/",
		SMOKE: "client/tanukitchen/smoke/",
		WEIGHT: "client/tanukitchen/weight/",
		EXTRACTOR: "client/tanukitchen/extractor/",
	},
	server: {
		STOVE: "server/tanukitchen/stove/",
		SMOKE: "server/tanukitchen/smoke/",
		WEIGHT: "server/tanukitchen/weight/",
		EXTRACTOR: "server/tanukitchen/extractor/",
	},
};

/**
 * Establece la conexión con un servidor MQTT y configura los callbacks para recibir y enviar mensajes a través de MQTT.
 * @param {Object} io - Objeto de Socket.IO que representa la conexión de Socket.IO.
 */
export default function listenMQTT(io) {
	/**
     * Objeto de configuración para la conexión MQTT.
     * @type {Object}
     * @property {string} host - Dirección del servidor MQTT.
     * @property {number} port - Puerto del servidor MQTT.
     * @property {string} protocol - Protocolo de conexión con el servidor MQTT.
     * @property {string} username - Nombre de usuario para la conexión con el servidor MQTT.
     * @property {string} password - Contraseña para la conexión con el servidor MQTT.
     * @property {string} clientId - ID del cliente MQTT.
     */
	var client = connect({
		host: process.env.MQTT_CLUSTER_URL,
		port: process.env.MQTT_PORT,
		protocol: process.env.MQTT_PROTOCOL,
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD,
	});

    /**
     * Callback que se ejecuta cuando se establece la conexión MQTT.
     * @event connect
     */
    client.on("connect", function () {
		console.log("Connected to MQTT");
	});

	/**
	 * Callback que se ejecuta cuando se produce un error en la conexión MQTT.
	 * @param {Error} error - Error que indica el motivo del fallo en la conexión MQTT.
	 */
	client.on("error", function (error) {
		console.log("Error MQTT.js: ", error);
	});

    /**
     * Callback que se ejecuta cuando se establece la conexión de Socket.IO.
     * @event connection
     * @param {Object} socket - Objeto de Socket.IO que representa la conexión de Socket.IO.
     */
    io.on("connection", (socket) => {
		/**
		 * Callback que se ejecuta cuando se recibe un mensaje desde el servidor MQTT.
		 * @param {string} topic - Tema del mensaje recibido.
		 * @param {Buffer} message - Mensaje recibido.
		 */
		client.on("message", function (topic, message) {
			if (topic.includes(mqttRoutes.client.STOVE)) {
				if (topic.includes("value")) {
					/**
					 * Evento emitido cuando se recibe un valor relacionado con la estufa desde el servidor MQTT.
					 * @event server:mqtt:stove:value
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:stove:value", {
						message: message.toString(),
					});
				} else if (topic.includes("action")) {
					/**
					 * Evento emitido cuando se recibe una acción relacionada con la estufa desde el servidor MQTT.
					 * @event server:mqtt:stove:action
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:stove:action", {
						message: message.toString(),
					});
				}
			} else if (topic.includes(mqttRoutes.client.WEIGHT)) {
				if (topic.includes("value")) {
					/**
					 * Evento emitido cuando se recibe un valor relacionado con el peso desde el servidor MQTT.
					 * @event server:mqtt:weight:value
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:weight:value", {
						message: message.toString(),
					});
				} else if (topic.includes("action")) {
					/**
					 * Evento emitido cuando se recibe una acción relacionada con el peso desde el servidor MQTT.
					 * @event server:mqtt:weight:action
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:weight:action", {
						message: message.toString(),
					});
				}
			} else if (topic.includes(mqttRoutes.client.SMOKE)) {
				if (topic.includes("value")) {
					/**
					 * Evento emitido cuando se recibe un valor relacionado con el humo desde el servidor MQTT.
					 * @event server:mqtt:smoke:value
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:smoke:value", {
						message: message.toString(),
					});
				}
			} else if (topic.includes(mqttRoutes.client.EXTRACTOR)) {
				if (topic.includes("action")) {
					/**
					 * Evento emitido cuando se recibe una acción relacionada con el extractor desde el servidor MQTT.
					 * @event server:mqtt:extractor:action
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
					socket.emit("server:mqtt:extractor:action", {
						message: message.toString(),
					});
				}
			}
		});

		/**
		 * Evento que se activa cuando se recibe una acción relacionada con la estufa desde el cliente.
		 * @param {string} action - Acción relacionada con la estufa enviada desde el cliente.
		 * @event client:mqtt:stove:action
		 */
		socket.on("client:mqtt:stove:action", (action) => {
			client.publish(mqttRoutes.server.STOVE + "action", action);
		});
		/**
		 * Evento que se activa cuando se recibe una acción relacionada con el humo desde el cliente.
		 * @param {string} action - Acción relacionada con el humo enviada desde el cliente.
		 * @event client:mqtt:smoke:action
		 */
		socket.on("client:mqtt:extractor:action", (action) => {
			client.publish(mqttRoutes.server.EXTRACTOR + "action", action);
		});
		/**
		 * Evento que se activa cuando se recibe una acción relacionada con el peso desde el cliente.
		 * @param {string} action - Acción relacionada con el peso enviada desde el cliente.
		 * @event client:mqtt:weight:action
		 */
		socket.on("client:mqtt:weight:action", (action) => {
			client.publish(mqttRoutes.server.WEIGHT + "action", action);
		});
		/**
		 * Evento que se activa cuando se recibe una acción relacionada con el la temperatura de la estufa desde el cliente.
		 * @param {string} temperature - Temperatura de la estufa enviada desde el cliente.
		 * @event client:mqtt:stove:temperature
		 */
		socket.on("client:mqtt:stove:temperature", (temperature) => {
			client.publish(
				mqttRoutes.server.STOVE + "temperature",
				temperature
			);
		});
	});

    /**
     * Suscribirse a los temas MQTT.
     * @param {string} topic - Tema MQTT al que suscribirse.
     * @event subscribe
     */
    client.subscribe("client/tanukitchen/#");
}