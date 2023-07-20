import { set, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Conecta a la base de datos de MongoDB utilizando la configuración especificada en la variable de entorno MONGO_CONNECTION_LINK.
 * Se recomienda llamar a esta función al iniciar la aplicación para establecer la conexión con la base de datos.
 */
function connectMongoDB() {
	const linkMongoDB = process.env.MONGO_CONNECTION_LINK;

	/**
	 * Establece la configuración "strictQuery" en false para permitir consultas menos estrictas en la base de datos.
	 */
	set("strictQuery", false);

	/**
	 * Conecta a la base de datos de MongoDB utilizando el enlace especificado.
	 * @returns {Promise<void>} Promesa que se resuelve cuando la conexión es exitosa.
	 * @throws {Error} Error si la conexión a la base de datos falla.
	 */
	connect(linkMongoDB)
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch((e) => {
			console.error(`Error ${e}`);
		});
}

export default connectMongoDB;
