import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../controllers/authHandlers";
import "./Login.scss";

export function Login() {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const updateEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailInput(e.currentTarget.value);
	};
	const updatePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
		setPasswordInput(e.currentTarget.value);
	};

	const validate = () => {
		if (emailInput === "") {
			alert("Please enter your email!");
			return false;
		} else if (passwordInput === "") {
			alert("Please enter your password!");
			return false;
		}
		return true;
	};

	const handleLogin = async () => {
		if (!validate()) return;

		login(emailInput, passwordInput);
	};

	return (
		<div id="login-panel">
			<form id="login-form">
				<input type="email" placeholder="Email" onInput={updateEmailInput} />
				<input type="password" placeholder="Password" onInput={updatePasswordInput} />
			</form>
			<button className="dark-text-button" onClick={handleLogin}>
				Login
			</button>
			<div>Need an account?</div>
			<Link to="/register">Register</Link>
		</div>
	);
}
