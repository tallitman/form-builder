import { Request, Response } from "express";

export enum ERROR_CODES {
	SERVER_ERROR = 500,
	NOT_FOUND = 404,
	BAD_DATA = 400,
}

export default function(errorCode: number, errorMessage?: string) {
	return (req: Request, res: Response) => {
		if (!errorMessage) {
			switch (errorCode) {
				case ERROR_CODES.SERVER_ERROR:
					errorMessage = `Something went wrong`;
					break;

				case ERROR_CODES.NOT_FOUND:
					errorMessage = `Couldn't find what you were looking for =( sorry...`;
					break;

				case ERROR_CODES.BAD_DATA:
					errorMessage = `Looks like you entered some bad data...`;
					break;

				default:
					errorMessage = `Something went wrong...`;
					break;
			}
		}

		return res
			.status(errorCode || 500)
			.json({
				errorMessage,
			});
	};
}
