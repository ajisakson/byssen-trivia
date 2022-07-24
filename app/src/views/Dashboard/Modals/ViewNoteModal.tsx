import MDEditor from "@uiw/react-md-editor";
import "./ViewNoteModal.scss";

export default function ViewNoteModal({ data }: any) {
	return (
		<div className="view-note" id={data.id}>
			<div className="view-note-header">{data.name}</div>
			<MDEditor.Markdown source={data.content} style={{ borderRadius: "4px", padding: "16px" }} />
			<div className="view-note-dates">
				<div>Created: {data.createdDate}</div>
				<div>Updated: {data.updatedDate}</div>
			</div>
		</div>
	);
}
