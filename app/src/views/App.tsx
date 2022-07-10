import { CapacitorPlatforms } from "@capacitor/core";
import { createContext, useContext, useEffect, useState } from "react";
import "./App.scss";
import { login, register } from "../controllers/authHandlers";
import { User } from "../models/User";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export interface UserInterface {
	appUser: User | null;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext({} as UserInterface);
export const useAuth = () => useContext(UserContext);

function App() {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [appUser, setUser] = useState({} as User);
	const authHandler: UserInterface = { appUser, setUser };
	const [shouldAuth, setShouldAuth] = useState(true);

	useEffect(() => {});

	const updateEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailInput(e.currentTarget.value);
	};
	const updatePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
		setPasswordInput(e.currentTarget.value);
	};

	const handleLogin = async () => {
		setShouldAuth(await !login(emailInput, passwordInput));
	};

	const handleRegister = () => {
		register(emailInput, passwordInput);
	};

	return (
		<UserContext.Provider value={authHandler}>
			<div className="App">
				<Link className="app-header-link" to="/">
					Byssen.com
				</Link>
				<Outlet />
			</div>
		</UserContext.Provider>
	);
}

export default App;
