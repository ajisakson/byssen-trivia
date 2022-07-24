import { logout } from "../controllers/authHandlers";
import { useAuth } from "./App";
import { useNavigate } from "react-router";
import "./Profile.scss";

export function Profile() {
	const { appUser, setUser } = useAuth();
	let navigate = useNavigate();

	const handleLogout = () => {
		setUser(logout());
		navigate("/");
	};

	return (
		<div id="profile-panel">
			<div>Hey, {appUser?.firstname || appUser?.username || appUser?.email}!</div>

			<button className="dark-text-button" onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}
