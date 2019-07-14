import React, { Component } from 'react';

import Axios from 'axios';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

import { Paper } from '../../style/Paper/Paper';
import { Button, DangerButton } from '../../style/Button/Button';
import { Table, THead, Tr, Td, TFoot } from '../../style/Table';
import { Row, Col } from '../../style/Grid';

import { FIELD_TYPES, BASE_API_URL } from '../../config/config';
import { TitleInput } from '../../style/Input';

export default class FormBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formName: 'Untitled Form',
			fields: [{
				fieldType: 'text',
				fieldName: 'Fullname',
				fieldLabel: 'fullname'
			}],
			newField: {
				fieldType: 'text',
				fieldName: '',
				fieldLabel: ''
			},
			isLoading: false
		};

		this.addField = this.addField.bind(this);
		this.removeField = this.removeField.bind(this);
		this.createForm = this.createForm.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	addField(newField) {
		const fields = [...this.state.fields];

		fields.push(newField);

		this.setState({fields});
	}

	removeField(e, fieldIndex) {
		e.preventDefault();

		const fields = [...this.state.fields];
		fields.splice(fieldIndex, 1);

		this.setState({fields});
	}

	handleSubmit(form) {
		console.log(form);
	}

	resetForm(e) {
		this.setState({fields: [{
			fieldType: 'text',
			fieldName: 'Fullname',
			fieldLabel: 'fullname'
		}]});
	}

	createForm(e) {
		e.preventDefault();

		const fields = this.state.fields;

		this.setState({isLoading: true});

		Axios
			.post(BASE_API_URL + '/forms', {
				name: this.state.formName,
				fields
			})
			.then(res => {
				toast.success("Your Form Was Created Successfully!", {position: toast.POSITION.BOTTOM_LEFT});
				this.props.history.push('/');
			})
			.catch(err => {
				console.log(err.response.data.errorMessage);
				toast.error(`An Error Occurd: ${err.response.data.errorMessage}`, {position: toast.POSITION.BOTTOM_LEFT});
			});
	}

	render() {

		const fields = [...this.state.fields];

		return (
			<div>
				<Paper>
					<Row>
						<Col>
							<div>
								<h1>Create A Form!</h1>
								<p>Welcome to the form builder! This wizard will help you generate your form from scratch!</p>
								<p>All Fields Are Required!</p>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<TitleInput
								value={this.state.formName}
								placeholder="Form Name"
								onChange={e => this.setState({formName: e.target.value})}
							/>
						</Col>
					</Row>
					<Formik
						validationSchema={Yup.object().shape({
							fieldLabel: Yup
								.string()
								.notOneOf(this.state.fields.map(field => field.fieldLabel))
								.required('This Field Is Required!'),
							fieldType: Yup
								.string()
								.required('This Field Is Required!'),
							fieldName: Yup
								.string()
								.notOneOf(this.state.fields.map(field => field.fieldName))
								.required('This Field Is Required!'),
						})}
						initialValues={{
							fieldLabel: '',
							fieldType: '',
							fieldName: ''
						}}
						onSubmit={this.addField}
						render={({values,
							errors,
							status,
							touched,
							handleBlur,
							handleChange,
							handleSubmit,
							isSubmitting}) => (
							<Row>
								<Col>
									<form onSubmit={handleSubmit} style={{width: '100%'}}>
										<Table>
											<THead>
												<Tr>
													<Td>
									#
													</Td>
													<Td>
									Field Name
													</Td>
													<Td>
									Field Label
													</Td>
													<Td colSpan={2}>
									Field Type
													</Td>
													{/* <Td></Td> */}
												</Tr>
											</THead>
											<tbody>
												{fields.map((field, i) => {
													return (
														<Tr key={`builder-table-${i + field.fieldName}`}>
															<Td>{i + 1}</Td>
															<Td>{field.fieldName}</Td>
															<Td>{field.fieldLabel}</Td>
															<Td>{field.fieldType}</Td>
															<Td>
																<DangerButton danger
																	onClick={e => this.removeField(e, i)}>Remove</DangerButton></Td>
														</Tr>
													);
												})}
											</tbody>
											<TFoot>
												<Tr>
													<Td>Add Field</Td>
													<Td>
														<Input
															placeholder="Field Name"
															name="fieldName"
															value={values.fieldName} 
															onChange={handleChange}
															onBlur={handleBlur}
															invalid={touched.fieldName && errors.fieldName}
															valid={!errors.fieldName && touched.fieldName} />
													</Td>
													<Td>
														<Input
															placeholder="Field Label"
															name="fieldLabel"
															value={values.fieldLabel} 
															onChange={handleChange}
															onBlur={handleBlur}
															invalid={touched.fieldLabel && errors.fieldLabel}
															valid={!errors.fieldLabel && touched.fieldLabel} />
													</Td>
													<Td>
														<Input
															type='select'
															placeholder="Field Type"
															name="fieldType"
															value={values.fieldType} 
															onChange={handleChange}
															onBlur={handleBlur}
															invalid={touched.fieldType && errors.fieldType}
															valid={!errors.fieldType && touched.fieldType} >
															{FIELD_TYPES.map(type => <option key={type}>{type}</option>)}

														</Input>
													</Td>
													<Td>
														<Button
															disabled={Object.values(errors).length || !Object.values(touched).length} >Add Field!</Button>
													</Td>
												</Tr>
											</TFoot>
										</Table>
									</form>
								</Col>
							</Row>
						)}>
					</Formik>
					<Button onClick={this.createForm} disabled={!this.state.formName || !fields.length}>Create this form!</Button>
				</Paper>
			</div>
		);
	}
}
