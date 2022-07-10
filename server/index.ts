import "./lib/db.config";
import express, { Request, Response } from "express";
import countryRoutes from "./routes/country.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3333;

const baseUrl = port === 3333 ? path.join(__dirname, "../dist/client") : path.join(__dirname, "client");

app.use(express.static(baseUrl));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/api", (req: Request, res: Response) => {
	res.send(true);
});

app.use("/api/countries", countryRoutes);
// app.use("/api/auth/register", authRoutes);
// app.use("/api/auth/login", authRoutes);

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(baseUrl, "/index.html"));
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
