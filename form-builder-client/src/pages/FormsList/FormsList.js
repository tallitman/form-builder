import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';
import { BASE_API_URL } from '../../config/config';

import { Paper } from '../../style/Paper/Paper';
import { Table, Tr, THead, Td } from '../../style/Table';
import { Button } from '../../style/Button/Button';
import { ApiLoader } from '../../components/LoadingComponent/LoadingComponent';

export default class FormsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forms: [],
			isLoading: true,
			apiError: null,
		};

		this.fetchForms = this.fetchForms.bind(this);
		this.onFormsFetchSuccess = this.onFormsFetchSuccess.bind(this);
		this.onFormsFetchError = this.onFormsFetchError.bind(this);
	}
	/**
 	* Fetch forms from API
 	*/
	fetchForms() {
		Axios
			.get(BASE_API_URL + '/forms')
			.then(this.onFormsFetchSuccess)
			.catch(this.onFormsFetchError);
	}

	onFormsFetchSuccess(res) {
		console.log('DATA', res.data);
		this.setState({
			forms: res.data,
			isLoading: false,
			apiError: null
		});
	}

	onFormsFetchError(err) {
		this.setState({
			forms: this.state.forms,
			isLoading: false,
			apiError: err.message
		});
	}

	componentDidMount() {
		this.fetchForms();
	}

	render() {

		if (this.state.isLoading || this.state.apiError) {
			return (
				<Paper>
					<ApiLoader 
						error={this.state.apiError}
					/>
				</Paper>
			);
		}
		const { forms } = this.state;
		return (
			<Paper>
				<Table>
					<THead>
						<Tr>
							<Td>Form Id</Td>
							<Td>Form Name</Td>
							<Td>No. Of Submissions</Td>
							<Td>Submit</Td>
							<Td>View Submissions</Td>
						</Tr>
					</THead>
					<tbody>
						{forms.map(form => {
							return (
								<Tr key={form._id}>
									<Td>{form._id}</Td>
									<Td>{form.name}</Td>
									<Td>{form.noOfSubmissions}</Td>
									<Td><Button as={Link} to={`/${form._id}/submit`}>Submit this form!</Button></Td>
									<Td><Button as={Link} to={`/${form._id}`}>Watch submissions</Button></Td>
								</Tr>
							);
						})}
					</tbody>
				</Table>
			</Paper>
		);
	}
}