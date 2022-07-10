import { User } from "./user.model";

import mongoose, { model, Schema, Document } from "mongoose";
import { jwtRefreshExpiration } from "../lib/auth.config";
import { v4 } from "uuid";

interface IRefreshToken extends Document {
	token: String;
	user: {
		type: mongoose.Schema.Types.ObjectId;
		ref: "User";
	};
	expiryDate: Date;
	createToken: Function;
	verifyExpiration: Function;
}
const RefreshTokenSchema = new Schema<IRefreshToken>({
	token: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	expiryDate: Date
});

const createToken = async (user: typeof User) => {
	let expiredAt = new Date();
	expiredAt.setSeconds(expiredAt.getSeconds() + jwtRefreshExpiration);
	let _token = v4();
	let _object = new RefreshToken({
		token: _token,
		// @ts-ignore
		user: user._id,
		expiryDate: expiredAt.getTime()
	});
	let refreshToken = await _object.save();

	return refreshToken.token;
};
const verifyExpiration = (token: any) => {
	return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
export { RefreshToken, createToken, verifyExpiration };
