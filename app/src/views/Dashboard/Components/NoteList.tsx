import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp, MdArrowLeft, MdArrowRight, MdEditNote } from "react-icons/md";
import { byssenApiClient } from "../../../controllers/byssenApiClient";
import { FocusState, useDashboard } from "../Dashboard";
import Note from "./Note";
import "./NoteList.scss";

export default function NoteList() {
	const { setData, setFocusModal, notes, setNotes } = useDashboard();
	const [listCollapsed, setListCollapsed] = useState(false);

	function addNote() {
		setFocusModal(FocusState.ADD_NOTE);
		setData({});
	}

	async function deleteNote(id: String) {
		byssenApiClient.delete(`note/${id}`).then(() => {
			const newArray = notes.filter((aNote: any) => aNote.uuid !== id);
			setNotes(newArray);
		});
	}

	return (
		<div id="note-list">
			<div id="note-list-header">
				<button
					id="collapse-button"
					onClick={() => {
						setListCollapsed(!listCollapsed);
					}}
				>
					{listCollapsed ? <MdArrowRight /> : <MdArrowLeft />}
				</button>
				{listCollapsed ? <MdEditNote /> : "Notes"}
				{!listCollapsed && (
					<button id="add-note-button" onClick={addNote}>
						+
					</button>
				)}
			</div>
			<div id="note-list-main" className={listCollapsed ? "closed" : "open"}>
				{notes.map((note: any) => (
					<Note
						key={note.uuid}
						id={note.uuid}
						name={note.name}
						content={note.content}
						createdDate={note.created}
						updatedDate={note.updated}
						onDelete={deleteNote}
					/>
				))}
			</div>
		</div>
	);
}
