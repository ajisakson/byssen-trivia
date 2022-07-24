import { MdOutlineVisibility, MdModeEdit, MdDelete } from "react-icons/md";
import { INote } from "../../../models/Note";
import { FocusState, useDashboard } from "../Dashboard";
import "./Note.scss";

export interface NoteProps extends INote {
	onDelete: Function;
}

function Note({ id, name, content, createdDate, updatedDate, onDelete }: NoteProps) {
	const { setData, setFocusModal } = useDashboard();

	function onView() {
		setFocusModal(FocusState.VIEW_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}
	function onEdit() {
		setFocusModal(FocusState.EDIT_NOTE);
		setData({ id, name, content, createdDate, updatedDate });
	}

	return (
		<div className="note" id={id}>
			<div className="row-container">
				<div className="note-name">{name ? name : `Updated: ${updatedDate}`}</div>
				<div className="updated-date">{`Updated: ${updatedDate}`}</div>
			</div>
			<div className="button-container">
				<button onClick={() => onView()}>
					<MdOutlineVisibility />
				</button>
				<button onClick={() => onEdit()}>
					<MdModeEdit />
				</button>
				<button onClick={() => onDelete(id)}>
					<MdDelete />
				</button>
			</div>
		</div>
	);
}

export default Note;
