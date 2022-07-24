import express, { Request, Response, NextFunction } from "express";
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from "../controllers/note.controller";
import { verifyToken } from "../lib/authJwt";
const noteRouter = express.Router();

noteRouter.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
	next();
});

noteRouter.get("/", [verifyToken], getNotes);
noteRouter.get("/:id", [verifyToken], getNoteById);
noteRouter.post("/", [verifyToken], createNote);
noteRouter.put("/:id", [verifyToken], updateNote);
noteRouter.delete("/:id", [verifyToken], deleteNote);

export { noteRouter };
