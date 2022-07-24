import axios from "axios";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import { byssenApiClient } from "../../../controllers/byssenApiClient";
import { useAuth } from "../../App";
import "./AddTaskModal.scss";

export default function AddTaskModal({ data }: any) {
	const [taskName, updateTaskName] = useState("");
	const [taskDescription, updateTaskDescription] = useState("");
	const [taskDueDate, updateTaskDueDate] = useState("");
	const { appUser } = useAuth();

	function setTaskDescription(event: ChangeEvent<HTMLTextAreaElement>) {
		updateTaskDescription(event.target.value);
	}

	function setTaskName(event: ChangeEvent<HTMLInputElement>) {
		updateTaskName(event.target.value);
	}

	function setTaskDueDate(event: ChangeEvent<HTMLInputElement>) {
		updateTaskDueDate(event.target.value);
	}

	async function createTask(taskName: String, taskDescription: String, taskDueDate: Date) {
		const payload = {
			name: taskName,
			description: taskDescription,
			due_date: taskDueDate,
			userid: appUser.id
		};
		try {
			byssenApiClient.post("task", payload);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className="add-task-modal">
			<div className="new-task">
				<h2>Add Task</h2>
				<input value={taskName} type="text" placeholder="Task Name" onChange={setTaskName} />
				<textarea value={taskDescription} placeholder="Task Description" onChange={setTaskDescription} />
				<input value={taskDueDate} type="date" placeholder="Task Due Date" onChange={setTaskDueDate} />
				<div className="button-container">
					<button
						onClick={() => {
							createTask(taskName, taskDescription, new Date(taskDueDate));
						}}
					>
						Create
					</button>
					<button onClick={() => {}}>Cancel</button>
				</div>
			</div>
		</div>
	);
}
