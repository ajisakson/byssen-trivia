import { model, Schema } from "mongoose";

interface IRole {
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
