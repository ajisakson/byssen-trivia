import { model, Schema, Types, Document } from "mongoose";

interface IRole extends Document {
	name: string;
}

const ROLES = ["user", "moderator", "admin"];

const RoleSchema = new Schema<IRole>({
	name: {
		type: String
	}
});

const Role = model<IRole>("Role", RoleSchema);

export { ROLES, Role, IRole };
