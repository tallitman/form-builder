import * as Yup from 'yup';

export const VALIDATION_SCHEMA = {
	text: Yup.string().required(),
	tel: Yup.string().required(),
	color: Yup.string().required(),
	date: Yup.date().required(),
	email: Yup.string().email().required(),
	number: Yup.number().required()
};