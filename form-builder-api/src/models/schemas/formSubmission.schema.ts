import { model, Schema } from "mongoose";

import IFormSubmission from "@interfaces/formSubmission.interface";

export const formSubmissionSchema: Schema<IFormSubmission> = new Schema({}, {
		timestamps: true,
		strict: false,
});
