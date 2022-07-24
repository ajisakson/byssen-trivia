import { Link } from "react-router-dom";
import "./Home.scss";
import { useAuth } from "./App";

export function Home() {
	const { appUser } = useAuth();
	return (
		<div id="home-panel">
			{!appUser?.id && (
				<Link className="dark-text-button" to="/login">
					Login
				</Link>
			)}
			{!appUser?.id && (
				<Link className="dark-text-button" to="/register">
					Register
				</Link>
			)}
			{appUser?.id && (
				<Link className="dark-text-button" to="/dashboard">
					Dashboard
				</Link>
			)}
			{appUser?.id && (
				<Link className="dark-text-button" to="/profile">
					Profile
				</Link>
			)}
		</div>
	);
}
