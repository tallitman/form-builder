import "module-alias/register";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { DB_ADDRESS, PORT } from "@config";

import * as logger from "@logger";
import connect from "@models/connect";
import routes from "@routes/";

const app: express.Express = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

connect(DB_ADDRESS);
routes(app);

app.listen(PORT, () => {
	logger.debug(`Server running! on port ${PORT} on ${process.env.NODE_ENV} enviroment`);
});
