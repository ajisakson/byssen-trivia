import mongoose from "mongoose";
import { Role } from "../models/role.model";

if (!process.env.MONGO_URL) {
	throw new Error("Please add the MONGO_URL environment variable");
}

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const database = mongoose.connection;

database.on("error", console.error.bind(console, "❌ mongodb connection error"));
database.once("open", () => {
	console.log("✅ mongodb connected successfully");
	initial();
});

function initial() {
	Role.estimatedDocumentCount({}, (err: any, count: number) => {
		if (!err && count === 0) {
			new Role({
				name: "user"
			}).save((err: any) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'user' to roles collection");
			});
			new Role({
				name: "moderator"
			}).save((err: any) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'moderator' to roles collection");
			});
			new Role({
				name: "admin"
			}).save((err: any) => {
				if (err) {
					console.log("error", err);
				}
				console.log("added 'admin' to roles collection");
			});
		}
	});
}

mongoose.Promise = Promise;
