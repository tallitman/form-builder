import { model, Schema } from "mongoose";

import { FORM_TYPES } from "@config";

import { IFormFields } from "@interfaces/formFields.interface";

export const formFieldsSchema: Schema<IFormFields> = new Schema({
	fieldLabel: {
		type: String,
		required: true,
	},
	fieldName: {
		type: String,
		required: true,
	},
	fieldType: {
		type: String,
		required: true,
		enum: FORM_TYPES,
	},
}, {
		timestamps: false,
		_id: false,
});
