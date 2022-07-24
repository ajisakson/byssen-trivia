import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { byssenApiClient } from "../../../controllers/byssenApiClient";
import "./EditTaskModal.scss";

export default function EditTaskModal({ data }: any) {
	const taskId = data.id;
	const [taskName, updateTaskName] = useState(data.name);
	const [taskDescription, updateTaskDescription] = useState(data.description);
	const [taskDueDate, updateTaskDueDate] = useState(data.dueDate);
	const [taskStatus, updateTaskStatus] = useState(data.status);

	useEffect(() => {
		updateTaskName(data.name);
		updateTaskDescription(data.description);
		updateTaskDueDate(data.dueDate);
		updateTaskStatus(data.status);
	}, [data]);

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	function setTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDueDate(event.target.value);
	}

	async function updateTask() {
		const payload = {
			id: taskId,
			name: taskName,
			description: taskDescription,
			due_date: taskDueDate,
			status: taskStatus
		};
		try {
			byssenApiClient.put(`/api/task/`, payload).then((e) => {
				// TODO: update the task list
			});
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="edit-task" id={data.id}>
			<h2>Edit Task</h2>
			<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
			<textarea value={taskDescription} placeholder="Task Description" onChange={setTaskDescription} />
			<input value={taskDueDate ? taskDueDate.slice(0, 10) : ""} type="date" onChange={setTaskDueDate} />
			<div className="button-container">
				<button onClick={updateTask}>Update</button>
				<button onClick={() => {}}>Cancel</button>
			</div>
		</div>
	);
}
