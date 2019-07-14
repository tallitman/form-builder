import * as Joi from "@hapi/joi";
import { Request, Response } from "express";
import mongoose, { models } from "mongoose";

import { FORM_TYPES, FORM_VALIDATORS } from "@config";
import * as logger from "@logger";
import formsModel from "@models/forms.model";

export async function getFormsList(req: Request, res: Response) {
	try {

		const forms = await formsModel
			.aggregate([{
				$project: {
					name: true,
					noOfSubmissions: {
						$size: "$submissions",
					},
				},
			}]);
		res.json(forms);
	} catch (error) {
		logger.critical(error);
		return res.send(500);
	}
}

export async function getFormById(req: Request, res: Response) {
	try {
		const formId = req.params.formId;

		if (!mongoose.Types.ObjectId.isValid(formId)) {
			return res
				.status(400)
				.json({
					errorCode: "INVALID_ID",
					errorMessage: `${formId} is not a valid ObjectId`,
				});
		}

		const form = await formsModel
			.findById(formId)
			.exec();

		if (!form) {
			return res
				.status(404)
				.json({
					errorCode: "NOT_FOUND",
					errorMessage: `Coudln't Find this form (ID: ${formId})`,
				});
		}
		return res.json(form);

	} catch (error) {
		logger.critical(error);
		return res.send(500);
	}
}

export async function createForm(req: Request, res: Response) {
	try {
		const reqBody = req.body;

		const bodySchema = Joi.object().keys({
			name: Joi.string().min(3).max(50).required(),
			fields: Joi.array().items(Joi.object().keys({
				fieldLabel: Joi.string().required(),
				fieldName: Joi.string().required(),
				fieldType: Joi.string().only(FORM_TYPES).required(),
			})).required().min(1),
		});

		const validation = Joi.validate(reqBody, bodySchema);

		if (validation.error) {
			return res
				.status(400)
				.json({
					errorCode: "BAD_REQUEST",
					errorMessage: validation.error.message,
				});
		}

		const createdForm = await formsModel.create(reqBody);

		res.json(createdForm);
	} catch (error) {
		logger.critical(error);
		res.send(500);
	}
}

export async function submitForm(req: Request, res: Response) {
	try {
		const formId = req.params.formId;
		const reqBody = req.body;

		const form = await formsModel.findById(formId).exec();

		if (!form) {
			logger.debug(`Form ID ${formId} couldn't be found anywhere!`);

			return res
				.status(404)
				.json({
					errorMessage: `We can't seem to find this form anywhere... please try again later.`,
				});
		}

		// Building up the validation schema object
		const validationObject: {[key: string]: any} = {};
		for (const field of form.fields) {
			validationObject[field.fieldName] = FORM_VALIDATORS[field.fieldType];
		}

		const validationSchema = Joi.object().keys(validationObject);
		const validationAnswer = Joi.validate(reqBody, validationSchema);

		if (validationAnswer.error) {
			logger.debug(`Validation error ${validationAnswer.error.message}`);

			return res
				.status(400)
				.json({
					errorMessage: `${validationAnswer.error}`,
				});
		}

		const newForm = await formsModel.findByIdAndUpdate(formId, {
			$push: {
				submissions: reqBody,
			},
		}, {
			new: true,
		}).exec();

		res.json(newForm);
	} catch (error) {
		logger.critical(error);
		res.send(500);
	}
}
