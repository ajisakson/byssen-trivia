import express, { Request, Response, NextFunction } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/task.controller";
import { verifyToken } from "../lib/authJwt";
const taskRouter = express.Router();

taskRouter.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	next();
});

taskRouter.get("/", [verifyToken], getTasks);
taskRouter.get("/:id", [verifyToken], getTaskById);
taskRouter.post("/", [verifyToken], createTask);
taskRouter.put("/:id", [verifyToken], updateTask);
taskRouter.delete("/:id", [verifyToken], deleteTask);

export { taskRouter };
