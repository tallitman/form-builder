import mongoose from "mongoose";

export default (address: string) => {

	const connect = () => {
		mongoose
			.connect(
				address,
				{ useNewUrlParser: true },
			)
			.then(() => {
				return console.info(`Successfully connected to ${address}`);
			})
			.catch((error) => {
				console.error("Error connecting to database: ", error);
				// return process.exit(1);
			});
	};

	connect();

	mongoose.connection.on("disconnected", connect);
};
