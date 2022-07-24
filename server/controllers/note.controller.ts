import { Request, Response } from "express";
import { Note } from "../models/note.model";
const uuid = require("uuid");

// get all user's tasks
const getNotes = async (req: any, res: Response) => {
	Note.find({ user: req.userId }).then((result: any) => {
		res.send(result);
	});
};

// get one of user's tasks
const getNoteById = (req: Request, res: Response) => {};

// create a user's task
const createNote = (req: Request, res: Response) => {
	const aNote = new Note({
		uuid: uuid.v4(),
		name: req.body.name,
		content: req.body.content,
		user: req.body.userid,
		created: new Date(),
		updated: new Date()
	});

	aNote.save().then(() => {
		res.send({ note: aNote });
	});
};

// update a user's task
const updateNote = (req: Request, res: Response) => {
	Note.updateOne(
		{ uuid: req.body.id },
		{
			$set: {
				name: req.body.name,
				content: req.body.content,
				updated: new Date()
			}
		}
	).then((result: any) => {
		res.send({
			result,
			note: { uuid: req.body.id, name: req.body.name, content: req.body.content, updated: new Date() }
		});
	});
};

// delete a user's task
const deleteNote = (req: Request, res: Response) => {
	Note.deleteOne({ uuid: req.params.noteId }).then(
		() => res.send(true),
		(err: any) => res.send(err)
	);
};

export { getNotes, getNoteById, createNote, updateNote, deleteNote };
