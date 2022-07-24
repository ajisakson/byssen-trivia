const config = require("../lib/auth.config");

import { Response, Request } from "express";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { createToken, RefreshToken, verifyExpiration } from "../models/refreshtoken.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { jwtExpiration } from "../lib/auth.config";

const signup = (req: Request, res: Response) => {
	const user = new User({
		username: req.body.username ? req.body.username : req.body.email,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		joined: new Date()
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
		username: req.body.username ? req.body.username : req.body.email
	})
		.populate("roles", "-__v")
		.exec(async (err: any, user: any) => {
			if (err) {
				res.status(500).send({ message: err });
				return;
			}
			if (!user) {
				return res.status(401).send({ message: "User Not found." });
			}
			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}
			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: jwtExpiration
			});
			let refreshToken = await createToken(user);
			var authorities = [];
			for (let i = 0; i < user.roles.length; i++) {
				authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
			}
			res.status(200).send({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: authorities,
				accessToken: token,
				refreshToken: refreshToken
			});
		});
};
const refreshToken = async (req: Request, res: Response) => {
	const { refreshToken: requestToken } = req.body;
	if (requestToken == null) {
		return res.status(403).json({ message: "Refresh Token is required!" });
	}
	try {
		let refreshToken = await RefreshToken.findOne({ token: requestToken });
		if (!refreshToken) {
			res.status(403).json({ message: "Refresh token is not in database!" });
			return;
		}
		if (verifyExpiration(refreshToken)) {
			RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

			res.status(403).json({
				message: "Refresh token was expired. Please make a new signin request"
			});
			return;
		}
		// @ts-ignore
		let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
			expiresIn: config.jwtExpiration
		});
		return res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: refreshToken.token
		});
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};

export { signup, signin, refreshToken };
