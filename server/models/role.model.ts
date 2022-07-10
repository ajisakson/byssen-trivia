import { model, Schema } from "mongoose";

interface IRole {
	name: string;
}

const RoleSchema = new Schema<IRole>({
	name: {
		type: String
	}
});

const Role = model<IRole>("Role", RoleSchema);

export { Role, IRole };
