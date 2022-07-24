import "./lib/db.config";
import express, { Request, Response } from "express";

import { authRouter } from "./routes/auth.routes";
import { userRouter } from "./routes/user.routes";
import { noteRouter } from "./routes/note.routes";
import { taskRouter } from "./routes/task.routes";

import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 3333;
const baseUrl = port === 3333 ? path.join(__dirname, "../dist/client") : path.join(__dirname, "client");

app.use(express.static(baseUrl));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);
app.use("/api/task", taskRouter);

app.get("/api", (req: Request, res: Response) => {
	res.send(true);
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(baseUrl, "/index.html"));
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
