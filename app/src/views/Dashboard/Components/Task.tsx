import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useRef, useState } from "react";
import "./Task.scss";
import "react-icons/md";
import { MdDelete, MdModeEdit, MdOutlineVisibility } from "react-icons/md";
import { FocusState, useDashboard } from "../Dashboard";
import { byssenApiClient } from "../../../controllers/byssenApiClient";
import { ITask } from "../../../models/Task";

export const TaskStatus = {
	0: "Todo",
	1: "Active",
	2: "Delegated",
	3: "Complete",
	4: "Cancelled"
};

export interface TaskProps extends ITask {
	onDelete: Function;
}

function Task({ uuid, name, description, createdDate, updatedDate, dueDate, status, onDelete }: TaskProps) {
	const [taskStatus, setStatus] = useState(status);
	const isMounted = useRef(false);

	function getOptions() {
		return Object.values(TaskStatus).map((value, index) => <option value={index}>{value}</option>);
	}

	function updateStatus(event: ChangeEvent<HTMLSelectElement>) {
		setStatus(parseInt(event.target.value));
	}

	const { setFocusModal, setData } = useDashboard();

	useEffect(() => {
		if (isMounted.current) {
			saveTask();
		} else {
			isMounted.current = true;
		}
	}, [taskStatus]);

	async function saveTask() {
		byssenApiClient.put(`task/${uuid}`, {
			id: uuid,
			name: name,
			description: description,
			due_date: dueDate,
			status: taskStatus
		});
	}

	function onView() {
		setFocusModal(FocusState.VIEW_TASK);
		setData({ uuid, name, description, createdDate, updatedDate, dueDate, status });
	}

	function onEdit() {
		setFocusModal(FocusState.EDIT_TASK);
		setData({ uuid, name, description, createdDate, updatedDate, dueDate, status });
	}

	return (
		<div className={`task ${Object.values(TaskStatus)[taskStatus]}`}>
			<div className="row-container">
				<div className="task-info">
					<div>{name}</div>
				</div>
				<div className="task-date-info">{dueDate && <p>Due: {dueDate}</p>}</div>
				<select defaultValue={taskStatus} onChange={updateStatus}>
					{getOptions()}
				</select>
			</div>
			<div className="button-container">
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(uuid)}>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default Task;
