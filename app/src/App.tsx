import { useState } from "react";
import "./App.scss";
import axios from "axios";

function App() {
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	const register = async () => {
		axios
			.post("/api/auth/signup", {
				email: emailInput,
				password: passwordInput
			})
			.then((e) => {
				console.log(e);
			});
	};

	const login = async () => {
		axios
			.post("/api/auth/signin", {
				email: emailInput,
				password: passwordInput
			})
			.then((e) => {
				console.log(e);
			});
	};

	const updateEmailInput = (e: React.FormEvent<HTMLInputElement>) => {
		setEmailInput(e.currentTarget.value);
	};
	const updatePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
		setPasswordInput(e.currentTarget.value);
	};

	return (
		<div className="App">
			<h1>Byssen.com </h1>
			<h3>Coming soon!</h3>
			{/* <form id="register-form">
				<input type="email" placeholder="Email" onInput={updateEmailInput} />
				<input type="password" placeholder="Password" onInput={updatePasswordInput} />
			</form>
			<button onClick={register}>Submit</button> */}
			<form id="login-form">
				<input type="email" placeholder="Email" onInput={updateEmailInput} />
				<input type="password" placeholder="Password" onInput={updatePasswordInput} />
			</form>
			<button onClick={login}>Submit</button>
		</div>
	);
}

export default App;
