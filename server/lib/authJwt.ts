import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	let token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}
	jwt.verify(token, config.secret, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.userId = decoded.id;
		next();
	});
};
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	User.findById(req.userId).exec((err: any, user: typeof User) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err: any, roles: typeof Role) => {
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
	User.findById(req.userId).exec((err: any, user: typeof User) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}
		Role.find(
			{
				_id: { $in: user.roles }
			},
			(err: any, roles: typeof Role) => {
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
const authJwt = {
	verifyToken,
	isAdmin,
	isModerator
};
module.exports = authJwt;
