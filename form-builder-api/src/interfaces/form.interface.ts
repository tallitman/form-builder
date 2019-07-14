import { Document } from "mongoose";

import { IFormFields } from "./formFields.interface";

export default interface IForm extends Document {
	name: string;
	fields: [IFormFields];
	createdAt: Date;
}
