import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.scss";
import { Register } from "./views/Auth/Register";
import { Login } from "./views/Auth/Login";
import { Home } from "./views/Home";
import Dashboard from "./views/Dashboard/Dashboard";
import { Profile } from "./views/Profile";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="profile" element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
