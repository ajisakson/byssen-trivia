import { secret } from "../lib/auth.config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}
	// @ts-ignore
	jwt.verify(token, secret, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		// @ts-ignore
		req.userId = decoded.id;
		next();
	});
};
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	User.findById(req.userId).exec((err: any, user: User) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err: any, roles: Array<typeof Role>) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "admin") {
						next();
						return;
					}
				}
				res.status(403).send({ message: "Require Admin Role!" });
				return;
			}
		);
	});
};
const isModerator = (req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	User.findById(req.userId).exec((err: any, user: User) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err: any, roles: Array<typeof Role>) => {
				if (err) {
					res.status(500).send({ message: err });
					return;
				}
				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === "moderator") {
						next();
						return;
					}
				}
				res.status(403).send({ message: "Require Moderator Role!" });
				return;
			}
		);
	});
};
export { verifyToken, isAdmin, isModerator };
