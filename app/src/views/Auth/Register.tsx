import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../controllers/authHandlers";
import "./Register.scss";

export function Register() {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
	let navigate = useNavigate();

	const updateEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailInput(e.currentTarget.value);
	};
	const updatePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
		setPasswordInput(e.currentTarget.value);
	};

	const updateConfirmPasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
		setConfirmPasswordInput(e.currentTarget.value);
	};

	const validate = () => {
		if (emailInput === "") {
			alert("Please enter your email!");
			return false;
		} else if (passwordInput === "") {
			alert("Please enter your password!");
			return false;
		} else if (confirmPasswordInput === "") {
			alert("Please confirm your password!");
			return false;
		} else if (passwordInput !== confirmPasswordInput) {
			alert("Please make sure your passwords match!");
			return false;
		}
		return true;
	};

	const handleRegister = () => {
		if (!validate()) return;

		register(emailInput, passwordInput).then(() => {
			navigate("/");
		});
	};

	return (
		<div id="register-panel">
			<form id="register-form">
				<input type="email" placeholder="Email" onInput={updateEmailInput} />
				<input type="password" placeholder="Password" onInput={updatePasswordInput} />
				<input type="password" placeholder="Confirm Password" onInput={updateConfirmPasswordInput} />
			</form>
			<button className="dark-text-button" onClick={handleRegister}>
				Register
			</button>
			<div>Have an account?</div>
			<Link to="/login">Login</Link>
		</div>
	);
}
