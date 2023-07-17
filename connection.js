import { set, connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = () => {
	const linkMongoDB = process.env.MONGO_CONNECTION_LINK;
	set("strictQuery", false);
	connect(linkMongoDB)
		.then(() => {
			console.log("Connected to mongoDB");
		})
		.catch((e) => {
			console.error(`Error ${e}`);
		});
};

export default connectMongoDB;
