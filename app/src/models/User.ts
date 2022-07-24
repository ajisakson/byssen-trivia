export interface IUser {
	id: String;
	email: String;
	firstname?: String;
	lastname?: String;
	username?: String;
	image?: String;
	accessToken: string | number | boolean;
	refreshToken: string | boolean;
}
