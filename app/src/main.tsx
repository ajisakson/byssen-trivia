import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { Home } from "./views/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
