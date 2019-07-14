import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink } from 'reactstrap';

import { Link } from 'react-router-dom';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({isOpen: !this.state.isOpen});
	}

	render() {
		return (
			<header id="header">
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Form Builder</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink tag={Link} to="/">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={Link} to="/build">Create a form!</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}
