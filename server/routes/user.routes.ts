import express, { Request, Response, NextFunction } from "express";

import { verifyToken, isModerator, isAdmin } from "../lib/authJwt";
import { allAccess, userBoard, moderatorBoard, adminBoard } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	next();
});
userRouter.get("/test/all", allAccess);
userRouter.get("/test/user", [verifyToken], userBoard);
userRouter.get("/test/mod", [verifyToken, isModerator], moderatorBoard);
userRouter.get("/test/admin", [verifyToken, isAdmin], adminBoard);

export { userRouter };
