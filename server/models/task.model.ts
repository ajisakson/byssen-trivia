import { model, Schema, Document, Date } from "mongoose";

interface ITask extends Document {
	uuid: String;
	name: String;
	description?: String;
	user: String;
	created: Date;
	updated: Date;
	due?: Date;
	status: Number;
	parent: String;
}

const TaskSchema = new Schema<ITask>({
	uuid: String,
	name: String,
	description: String,
	user: String,
	created: Date,
	updated: Date,
	due: Date,
	status: Number,
	parent: String
});
const Task = model<ITask>("Task", TaskSchema);

export { Task, ITask };
