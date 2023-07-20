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
	},
	server: {
		STOVE: "server/tanukitchen/stove/",
		SMOKE: "server/tanukitchen/smoke/",
		WEIGHT: "server/tanukitchen/weight/",
	},
};

/**
 * Establece la conexión con un servidor MQTT y configura los callbacks para recibir y enviar mensajes a través de MQTT.
 * @param {Object} io - Objeto de Socket.IO que representa la conexión de Socket.IO.
 */
export default function listenMQTT(io) {
	// initialize the MQTT client
	var client = connect({
		host: process.env.MQTT_CLUSTER_URL,
		port: process.env.MQTT_PORT,
		protocol: process.env.MQTT_PROTOCOL,
		username: process.env.MQTT_USERNAME,
		password: process.env.MQTT_PASSWORD,
	});

	// setup the callbacks
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

	// Conexion sockets locales
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
					/**
					 * Evento emitido cuando se recibe una acción relacionada con el humo desde el servidor MQTT.
					 * @event server:mqtt:smoke:action
					 * @type {Object}
					 * @property {string} message - Mensaje recibido convertido a cadena de texto.
					 */
				} else if (topic.includes("action")) {
					socket.emit("server:mqtt:smoke:action", {
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
			}
		});

		/**
		 * Evento que se activa cuando se recibe una acción relacionada con la estufa desde el cliente.
		 * @param {string} action - Acción relacionada con la estufa enviada desde el cliente.
		 */
		socket.on("client:mqtt:stove:action", (action) => {
			client.publish(mqttRoutes.server.WEIGHT + "action", action);
		});
		/**
		 * Evento que se activa cuando se recibe una acción relacionada con el humo desde el cliente.
		 * @param {string} action - Acción relacionada con el humo enviada desde el cliente.
		 */
		socket.on("client:mqtt:smoke:action", (action) => {
			client.publish(mqttRoutes.server.SMOKE + "action", action);
		});
		/**
		 * Evento que se activa cuando se recibe una acción relacionada con el peso desde el cliente.
		 * @param {string} action - Acción relacionada con el peso enviada desde el cliente.
		 */
		socket.on("client:mqtt:weight:action", (action) => {
			client.publish(mqttRoutes.server.STOVE + "action", action);
		});
	});

	// subscribe to topic
	client.subscribe("client/tanukitchen/#");

	// publish message 'Hello' to topic 'my/test/topic'
	//client.publish('my/test/topic', 'Hello')
}
