import { Request, Response } from "express";
import { Task } from "../models/task.model";
const uuid = require("uuid");

// get all user's tasks
const getTasks = async (req: any, res: Response) => {
	Task.find({ user: req.userId }).then((result: any) => {
		res.send(result);
	});
};

// get one of user's tasks
const getTaskById = (req: Request, res: Response) => {};

// create a user's task
const createTask = (req: any, res: Response) => {
	const aTask = new Task({
		uuid: uuid.v4(),
		name: req.body.name,
		description: req.body.description,
		user: req.body.userid,
		created: new Date(),
		updated: new Date(),
		due: req.body.due_date,
		status: 0,
		parent: ""
	});

	aTask.save().then(() => {
		res.send({ task: aTask });
	});
};

// update a user's task
const updateTask = (req: Request, res: Response) => {
	Task.updateOne(
		{ uuid: req.body.id },
		{
			$set: {
				name: req.body.name,
				description: req.body.description,
				updated: new Date(),
				due: req.body.due_date,
				status: req.body.status
			}
		}
	).then((result: any) => {
		res.send(result);
	});
};

// delete a user's task
const deleteTask = (req: Request, res: Response) => {
	Task.deleteOne({ uuid: req.params.taskId }).then(
		() => res.send(true),
		(err: any) => res.send(false)
	);
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask };
