import { model, Schema } from "mongoose";

interface IUser {
	username?: string;
	email: string;
	password: string;
	roles: [
		{
			type: Schema.Types.ObjectId;
			ref: "role";
		}
	];
	joined: string;
	firstname?: string;
	lastname?: string;
	birthday?: string;
	address?: string;
	address2?: string;
	state?: string;
	country?: string;
	zip?: string;
	image?: string;
	description?: string;
}

const UserSchema = new Schema<IUser>({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	roles: [{ type: Schema.Types.ObjectId, ref: "role" }],
	joined: { type: String, required: true },
	username: { type: String, unique: true },
	firstname: String,
	lastname: String,
	birthday: String,
	address: String,
	address2: String,
	state: String,
	country: String,
	zip: String,
	image: String,
	description: String
});
const User = model<IUser>("User", UserSchema);

export { User, IUser };
