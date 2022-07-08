import "./lib/db";
import express, { Request, Response } from "express";
import countryRoutes from "./routes/country";

const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3333;

const baseUrl = port === 3333 ? path.join(__dirname, "../dist/client") : path.join(__dirname, "client");

app.use(express.static(baseUrl));
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.join(baseUrl, "/index.html"));
});

app.use("/countries", countryRoutes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
