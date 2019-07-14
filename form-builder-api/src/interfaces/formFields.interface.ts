import { Schema } from "mongoose";

export interface IFormFields extends Schema {
	fieldName: string;
	fieldLabel: string;
	fieldType: string;
}
