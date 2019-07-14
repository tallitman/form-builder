import Joi from "@hapi/joi";

export const PORT: number | string = process.env.PORT || 4000;
export const DB_ADDRESS: string = process.env.MONGODB_URI || "mongodb://localhost:27017/wix";

export const FORM_TYPES: string[] = ["text", "tel", "color", "date", "email", "number"];

export const FORM_VALIDATORS: {[key: string]: any} = {
	text: Joi.string(),
	tel: Joi.string(),
	color: Joi.string(),
	date: Joi.date(),
	email: Joi.string().email(),
	number: Joi.number(),
};
