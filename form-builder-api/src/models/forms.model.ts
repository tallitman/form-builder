import { FORM_TYPES } from "@config";
import { model, Schema } from "mongoose";

import { formFieldsSchema } from "@models/schemas/formFields.schema";
import { formSubmissionSchema } from "./schemas/formSubmission.schema";

import IForm from "@interfaces/form.interface";

const formsSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	fields: [formFieldsSchema],
	submissions: {
		type: [formSubmissionSchema],
		required: true,
	},
}, {
	timestamps: true,
});

export default model<IForm>("form", formsSchema);
