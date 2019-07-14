import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import FormsList from './pages/FormsList/FormsList';
import SubmitForm from './pages/SubmitForm/SubmitForm';
import FormSubmissions from './pages/FormSubmissions/FormSubmissions';
import FormBuilder from './pages/FormBuilder/FormBuilder';
import Header from './components/Header/Header';


const history = createBrowserHistory();

export default () => (
	<div>
		<Router history={history}>
			<Header />
			<Switch>
				<Route path="/" exact component={FormsList} />
				<Route path="/build" exact component={FormBuilder} />
				<Route path="/:formId" exact component={FormSubmissions} />
				<Route path="/:formId/submit" exact component={SubmitForm} />
				<Route component={FormsList} />
			</Switch>
		</Router>
	</div>
);
