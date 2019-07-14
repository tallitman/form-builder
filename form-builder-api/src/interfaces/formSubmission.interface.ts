import { Document } from "mongoose";
export default interface IFormSubmission extends Document {
	createdAt: Date;
	updatedAt: Date;
}
