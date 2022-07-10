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
	byssenApiClient
		.post("auth/signin", {
			email,
			password
		})
		.then((e) => {
			console.log(e);
			return true;
		});
	return false;
};

const logout = () => {};

export { login, register, logout };
