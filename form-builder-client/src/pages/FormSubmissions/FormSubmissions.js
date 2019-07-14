import React, { Component } from 'react';
import Axios from 'axios';
import moment from 'moment';

import { BASE_API_URL } from '../../config/config';
import { Paper } from '../../style/Paper/Paper';
import { Table, THead, Tr, Td } from '../../style/Table';
import { Row , Col} from '../../style/Grid';
import { ApiLoader } from '../../components/LoadingComponent/LoadingComponent';
export default class FormSubmissions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: null,
			isLoading: true,
			apiError: null
		};

		this.fetchForm = this.fetchForm.bind(this);
		this.onFormFetchSuccess = this.onFormFetchSuccess.bind(this);
		this.onFormFetchError = this.onFormFetchError.bind(this);
	}

	fetchForm() {
		const formId = this.props.match.params.formId;
		Axios
			.get(BASE_API_URL + `/forms/${formId}`, {
				params: {
					type: 'results'
				}
			})
			.then(this.onFormFetchSuccess)
			.catch(this.onFormFetchError);
	}

	onFormFetchSuccess(res) {
		this.setState({
			form: res.data,
			isLoading: false,
			apiError: null
		});
	}

	onFormFetchError(err) {
		this.setState({
			form: this.state.form,
			isLoading: false,
			apiError: err
		});
	}

	componentDidMount() {
		this.fetchForm();
	}

	render() {

		const { form } = this.state;

		if (!form) {
			return (
				<ApiLoader error={this.state.apiError} />
			);
		}
		return (
			<div>
				<Paper scrollable>
					<Row>
						<Col>
							<h1>Submissions for "{form.name}"</h1>
							<p>here is the list of all your submissions...</p>
						</Col>
					</Row>
					<Row>
						<Col>

							<Table>
								<THead>
									<Tr>
										<Td>Submission Id</Td>
										{form.fields.map(field => {
											return (
												<Td key={field.fieldName}>{field.fieldName}</Td>
											);
										})
										}
										<Td>Submitted at</Td>
									</Tr>
								</THead>
								<tbody>
									{form.submissions.map(submission => {
										return (
											<Tr key={submission._id}>
												<Td>{submission._id}</Td>
												{form.fields.map(field => {
													return (
														<Td key={field.fieldName}>{submission[field.fieldName]}</Td>
													);
												})}
												<Td>
													{moment(submission.createdAt).format('DD-MM-YYYY HH:mm')}
												</Td>
											</Tr>
										);
									})}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Paper>
			</div>
		);
	}
}
