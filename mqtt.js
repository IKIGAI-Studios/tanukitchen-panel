import { connect } from "mqtt";

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

	client.on("error", function (error) {
		console.log("Error MQTT.js: ", error);
	});

	// Conexion sockets locales
	io.on("connection", (socket) => {
		// Conexion con MQTT
		client.on("message", function (topic, message) {
			if (topic.includes(mqttRoutes.client.STOVE)) {
				if (topic.includes("value")) {
					socket.emit("server:mqtt:stove:value", {
						message: message.toString(),
					});
				} else if (topic.includes("action")) {
					socket.emit("server:mqtt:stove:action", {
						message: message.toString(),
					});
				}
			} else if (topic.includes(mqttRoutes.client.SMOKE)) {
				if (topic.includes("value")) {
					socket.emit("server:mqtt:smoke:value", {
						message: message.toString(),
					});
				} else if (topic.includes("action")) {
					socket.emit("server:mqtt:smoke:action", {
						message: message.toString(),
					});
				}
			} else if (topic.includes(mqttRoutes.client.WEIGHT)) {
				if (topic.includes("value")) {
					socket.emit("server:mqtt:weight:value", {
						message: message.toString(),
					});
				} else if (topic.includes("action")) {
					socket.emit("server:mqtt:weight:action", {
						message: message.toString(),
					});
				}
			}
		});

		socket.on("client:mqtt:stove:action", (action) => {
			client.publish(mqttRoutes.server.WEIGHT + "action", action);
		});
		socket.on("client:mqtt:smoke:action", (action) => {
			client.publish(mqttRoutes.server.SMOKE + "action", action);
		});
		socket.on("client:mqtt:weight:action", (action) => {
			client.publish(mqttRoutes.server.STOVE + "action", action);
		});
	});

	// subscribe to topic
	client.subscribe("client/tanukitchen/#");

	// publish message 'Hello' to topic 'my/test/topic'
	//client.publish('my/test/topic', 'Hello')
}
