import express, { Router, Request, Response, NextFunction } from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../lib/verifyRegistration";
const authRouter = express.Router();
import { refreshToken, signin, signup } from "../controllers/auth.controller";

authRouter.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	next();
});
authRouter.post("/refreshtoken", refreshToken);
authRouter.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
authRouter.post("/signin", signin);

export { authRouter };
