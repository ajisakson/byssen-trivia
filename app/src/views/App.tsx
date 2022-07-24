import { createContext, useContext, useEffect, useState } from "react";
import "./App.scss";
import { IUser } from "../models/User";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export interface UserInterface {
	appUser: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = createContext({} as UserInterface);
export const useAuth = () => useContext(UserContext);

function App() {
	const [appUser, setUser] = useState({} as IUser);
	const authHandler: UserInterface = { appUser, setUser };

	useEffect(() => {
		let storedUser = localStorage.getItem("User") || "{}";
		let storedUserObj: IUser = JSON.parse(storedUser);
		setUser(storedUserObj);
	}, []);

	return (
		<UserContext.Provider value={authHandler}>
			<div className="App">
				<Link className="app-header-link" to="/">
					Byssen
				</Link>
				<Outlet />
			</div>
		</UserContext.Provider>
	);
}

export default App;
