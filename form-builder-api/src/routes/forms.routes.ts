import { Router } from "express";

import { createForm, getFormById, getFormsList, submitForm } from "@controllers/forms.ctrl";

const router = Router();

router
	.get("/", getFormsList)
	.get("/:formId", getFormById)
	.post("/:formId", submitForm)
	.post("/", createForm);

export default router;
