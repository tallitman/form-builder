import express from "express";

import formsRoutes from "@routes/forms.routes";

export default (app: express.Express) => {
	app.use("/forms", formsRoutes);
};
