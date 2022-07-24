import { IUser } from "../models/User";
import { byssenApiClient } from "./byssenApiClient";

const register = async (email: String, password: String) => {
	byssenApiClient
		.post("auth/signup", {
			email,
			password
		})
		.then(() => {
			login(email, password);
		});
};

const login = async (email: String, password: String) => {
	const result = await byssenApiClient
		.post("auth/signin", {
			email,
			password
		})
		.then((e) => {
			localStorage.setItem("User", JSON.stringify(e.data));
			return e.data;
		})
		.catch((e) => {
			return {} as IUser;
		});
	return result;
};

const logout = () => {
	localStorage.removeItem("User");
	return {} as IUser;
};

export { login, register, logout };
