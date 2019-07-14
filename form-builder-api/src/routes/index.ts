import express, { Request, Response } from "express";

import formsRoutes from "@routes/forms.routes";

export default (app: express.Express) => {
	app.use("/forms", formsRoutes);

	app.get("/", (req: Request, res: Response) => {
		res.json({
			status: "OK",
		});
	});
};
