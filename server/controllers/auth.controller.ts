const config = require("../lib/auth.config");

import { Response, Request } from "express";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const signup = (req: Request, res: Response) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});
	user.save((err: any, user: any) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		if (req.body.roles) {
			Role.find(
				{
					name: { $in: req.body.roles }
				},
				(err: any, roles: Array<typeof Role>) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					// @ts-ignore
					user.roles = roles.map((role: typeof Role) => role._id);
					user.save((err: any) => {
						if (err) {
							res.status(500).send({ message: err });
							return;
						}
						res.send({ message: "User was registered successfully!" });
					});
				}
			);
		} else {
			Role.findOne({ name: "user" }, (err: any, role: Array<typeof Role>) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				// @ts-ignore
				user.roles = [role._id];
				user.save((err: any) => {
					if (err) {
						res.status(500).send({ message: err });
						return;
					}
					res.send({ message: "User was registered successfully!" });
				});
			});
		}
	});
};
const signin = (req: Request, res: Response) => {
	User.findOne({
		username: req.body.username
	})
		.populate("roles", "-__v")
		.exec((err: any, user: any) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}
			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}
			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: 86400 // 24 hours
			});
			var authorities = [];
			for (let i = 0; i < user.roles.length; i++) {
				authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
			}
			res.status(200).send({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: authorities,
				accessToken: token
			});
		});
};

export { signup, signin };
