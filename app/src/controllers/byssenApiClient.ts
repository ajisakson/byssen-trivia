import type { AxiosError } from "axios";
import axios from "axios";
import { User } from "../models/User";

class TokenService {
	accessToken = "";
}
export const tokenService = new TokenService();

// > create axios instance with access token and base url
const byssenApiClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || "/api",
	headers: {
		"Content-Type": "application/json",
		"x-access-token": tokenService.accessToken
	}
});

export const refreshToken = async () => {
	const {
		data: { accessToken: resAccessToken, user }
	} = await byssenApiClient.post<{ accessToken: string; user: User }>(
		"auth/refreshtoken",
		{},
		{
			withCredentials: true
		}
	);
	tokenService.accessToken = resAccessToken ?? "";
	return user;
};

// > set up base access token interceptor
byssenApiClient.interceptors.request.use(
	(config) => {
		// > set access token in header
		if (tokenService.accessToken) {
			config.headers = {
				...config.headers,
				"x-access-token": tokenService.accessToken
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
