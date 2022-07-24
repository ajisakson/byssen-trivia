import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../App";
import DashboardFocus from "./DashboardFocus";
import { NoteProps } from "./Components/Note";
import NoteList from "./Components/NoteList";
import { TaskProps } from "./Components/Task";
import TaskList from "./Components/TaskList";
import { byssenApiClient } from "../../controllers/byssenApiClient";

import "./Dashboard.scss";

export enum FocusState {
	ADD_TASK,
	EDIT_TASK,
	VIEW_TASK,
	ADD_NOTE,
	EDIT_NOTE,
	VIEW_NOTE
}

export interface FocusInterface {
	focusModal: FocusState;
	setFocusModal: React.Dispatch<React.SetStateAction<FocusState>>;
	data: Record<string, any>;
	setData: React.Dispatch<React.SetStateAction<{}>>;
	tasks: Array<TaskProps>;
	setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
	notes: Array<NoteProps>;
	setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
}

export const DashboardContext = createContext({} as FocusInterface);
export const useDashboard = () => useContext(DashboardContext);

function Dashboard() {
	const [focusModal, setFocusModal] = useState(FocusState.ADD_NOTE);
	const [data, setData] = useState({});
	const [tasks, setTasks] = useState([] as Array<TaskProps>);
	const [notes, setNotes] = useState([] as Array<NoteProps>);
	const { appUser } = useAuth();
	const value: FocusInterface = { focusModal, setFocusModal, data, setData, tasks, setTasks, notes, setNotes };

	useEffect(() => {
		if (!appUser?.id) return;
		const fetchData = async () => {
			const tasksRes = await byssenApiClient.get("task", { userid: appUser.id });
			setTasks(tasksRes.data);
			const notesRes = await byssenApiClient.get("note", { userid: appUser.id });
			setNotes(notesRes.data);
		};
		fetchData();
	}, [appUser]);

	return (
		<DashboardContext.Provider value={value}>
			<div className="dashboard-page">
				<div className="main-ui">
					<TaskList />
					<NoteList />
					<DashboardFocus />
				</div>
			</div>
		</DashboardContext.Provider>
	);
}

export default Dashboard;
