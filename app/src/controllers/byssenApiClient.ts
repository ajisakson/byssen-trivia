import type { AxiosError } from "axios";
import axios from "axios";
import { IUser } from "../models/User";

const curAccessToken = () => {
	let user = localStorage.getItem("User") || "{}";
	let userObj: IUser = JSON.parse(user);
	if (userObj && userObj.accessToken) {
		return userObj.accessToken;
	}
	return false;
};

const curRefreshToken = () => {
	let user = localStorage.getItem("User") || "{}";
	let userObj = JSON.parse(user);
	if (userObj && userObj.refreshToken) {
		return userObj.refreshToken;
	}
	return false;
};

// > create axios instance with access token and base url
const byssenApiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "/api",
	headers: {
		"Content-Type": "application/json",
		"x-access-token": curAccessToken()
	}
});

export const refreshToken = async () => {
	const {
		data: { accessToken: resAccessToken, user }
	} = await byssenApiClient.post<{ accessToken: string; user: IUser }>(
		"auth/refreshtoken",
		{ refreshToken: curRefreshToken() },
		{
			withCredentials: true
		}
	);

	let aUser = localStorage.getItem("User") || "{}";
	let aUserObj = JSON.parse(aUser);
	aUserObj.accessToken = resAccessToken ?? "";

	localStorage.setItem("User", JSON.stringify(aUserObj));

	return user;
};

// > set up base access token interceptor
byssenApiClient.interceptors.request.use(
	(config) => {
		// > set access token in header
		if (curAccessToken()) {
			config.headers = {
				...config.headers,
				"x-access-token": curAccessToken()
			};
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// > set up 401 error interceptor
byssenApiClient.interceptors.response.use(
	(response) => response,
	async (err: AxiosError<{ accessToken: string }>) => {
		// > TODO: clean up this typecasting. This is a bit of a hack to assure _retry is available
		const originalConfig = err.config as unknown as typeof err.config & {
			_retry: boolean;
		};

		if (originalConfig.url !== "auth/signin" && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				// prevent retry loop
				originalConfig._retry = true;

				try {
					await refreshToken();

					return await byssenApiClient(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}
		return Promise.reject(err);
	}
);

export { byssenApiClient };
