import { createExpressEndpoints } from "@ts-rest/express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { contract, router } from "./contract";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createExpressEndpoints(contract, router, app);

const port = process.env.port || 3001;

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
