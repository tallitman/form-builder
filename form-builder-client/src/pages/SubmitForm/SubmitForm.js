import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { BASE_API_URL } from '../../config/config';

import { Paper } from '../../style/Paper/Paper';
import { Row, Col } from '../../style/Grid';
import { Button } from '../../style/Button/Button';
import { VALIDATION_SCHEMA } from '../../helpers/validators';
import { Input, Label, FormGroup, FormFeedback } from 'reactstrap';
import { toast } from 'react-toastify';
import { ApiLoader } from '../../components/LoadingComponent/LoadingComponent';
import EmptyState from '../../components/EmptyState/EmptyState';

export default class SubmitForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forms: null,
			isLoading: true,
			apiError: null
		};
		this.fetchForm = this.fetchForm.bind(this);
		this.onFormFetchSuccess = this.onFormFetchSuccess.bind(this);
		this.onFormFetchError = this.onFormFetchError.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	fetchForm() {
		const formId = this.props.match.params.formId;
		Axios
			.get(BASE_API_URL + `/forms/${formId}`, {
				params: {
					type: 'submit'
				}
			})
			.then(this.onFormFetchSuccess)
			.catch(this.onFormFetchError);
	}

	onFormFetchSuccess(res) {
		this.setState({
			forms: res.data,
			isLoading: false,
			apiError: null
		});
	}

	onFormFetchError(err) {
		this.setState({
			forms: this.state.forms,
			isLoading: false,
			apiError: err
		});
	}

	/**
	 * 
	 * @param {Array} fields 
	 */
	generateValidationSchema(fields) {
		const validationObj = {};

		fields.forEach(field => {
			validationObj[field.fieldName] = VALIDATION_SCHEMA[field.fieldType];
		});

		return  Yup.object().shape(validationObj);
	}
	
	/**
	 * 
	 * @param {Array} fields 
	 */
	getInitialValues(fields) {
		const typesObj = {};


		fields.forEach(field => {
			switch(field.fieldType) {
			case ('number'):
				typesObj[field.fieldName] = 0;
				break;
				
			default:
				typesObj[field.fieldName] = '';
				break;
			}
		});

		return typesObj;
	}

	handleSubmit(form) {

		const formId = this.props.match.params.formId;

		this.setState({isFormLoading: true});

		Axios
			.post(BASE_API_URL + `/forms/${formId}`, form)
			.then(res => {
				toast.success('Your Form Was Submitted Successfuly!', {
					position: toast.POSITION.BOTTOM_LEFT
				});
				this.props.history.push(`/${formId}`);
			})
			.catch(err => {
				toast.error(`An Error Occurrd: ${err.response.data.errorMessage}`, {
					position: toast.POSITION.BOTTOM_LEFT
				});
			});

	}

	componentDidMount() {
		this.fetchForm();
	}

	render() {
		
		const form = this.state.forms;

		if (!form || this.state.isLoading) {
			return (
				<ApiLoader error={this.state.apiError}/>
			);
		}
		
		return (
			<Paper>
				<h1>Submitting form {form.name} ({form._id})</h1>

				<Formik
					validationSchema={this.generateValidationSchema(form.fields)}
					initialValues={this.getInitialValues(form.fields)}
					onSubmit={this.handleSubmit}
					render={({values,
						errors,
						status,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
						isSubmitting}) => (
						<form onSubmit={handleSubmit}>
							<Row>
								<Col>
									{form.fields.map(field => {
										return (
											<FormGroup key={field.fieldName}>
												<Label htmlFor={`form-field${field.fieldName}`}>{field.fieldLabel}</Label>
												<Input
													valid={touched[field.fieldName] && !errors[field.fieldName]}
													invalid={touched[field.fieldName] && errors[field.fieldName]}
													type={field.fieldType}
													name={field.fieldName} 
													id={`form-field${field.fieldName}`} 
													onChange={handleChange}
													onBlur={handleBlur}
													value={values[field.fieldName]}
												/>
												<FormFeedback>{errors[field.fieldName]}</FormFeedback>
											</FormGroup>
										);
									})}
								</Col>
							</Row>
							<Row>
								<Col>
									<Button disabled={!Object.keys(touched).length || Object.keys(errors).length || this.state.isFormLoading}>
										Submit this form!
									</Button>
								</Col>
							</Row>
						</form>
					)}>
				</Formik>
			</Paper>
		);
	}
}
