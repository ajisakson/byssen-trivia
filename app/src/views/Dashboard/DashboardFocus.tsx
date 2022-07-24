import AddNoteModal from "./Modals/AddNoteModal";
import AddTaskModal from "./Modals/AddTaskModal";
import EditNoteModal from "./Modals/EditNoteModal";
import EditTaskModal from "./Modals/EditTaskModal";
import ViewNoteModal from "./Modals/ViewNoteModal";
import ViewTaskModal from "./Modals/ViewTaskModal";
import { FocusState, useDashboard } from "./Dashboard";
import "./DashboardFocus.scss";

export default function DashboardFocus() {
	const { focusModal, data } = useDashboard();

	return (
		<div className="dashboard-focus">
			{focusModal === FocusState.ADD_TASK && <AddTaskModal data={data} />}
			{focusModal === FocusState.EDIT_TASK && <EditTaskModal data={data} />}
			{focusModal === FocusState.VIEW_TASK && <ViewTaskModal data={data} />}
			{focusModal === FocusState.ADD_NOTE && <AddNoteModal data={data} />}
			{focusModal === FocusState.EDIT_NOTE && <EditNoteModal data={data} />}
			{focusModal === FocusState.VIEW_NOTE && <ViewNoteModal data={data} />}
		</div>
	);
}
