import { model, Schema, Document, Date } from "mongoose";

interface INote extends Document {
	uuid: String;
	name: String;
	content?: String;
	user: String;
	created: Date;
	updated: Date;
}

const NoteSchema = new Schema<INote>({
	uuid: String,
	name: String,
	content: String,
	user: String,
	created: Date,
	updated: Date
});
const Note = model<INote>("Note", NoteSchema);

export { Note, INote };
