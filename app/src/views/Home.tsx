import { Link } from "react-router-dom";
import "./Home.scss";

export function Home() {
	return (
		<div id="home-panel">
			<Link className="dark-text-button" to="/login">
				Login
			</Link>
			<Link className="dark-text-button" to="/register">
				Register
			</Link>
		</div>
	);
}
