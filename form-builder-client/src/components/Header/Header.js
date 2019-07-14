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

		this.state = {};
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
							{/* <UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
                  Options
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
                    Option 1
									</DropdownItem>
									<DropdownItem>
                    Option 2
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem>
                    Reset
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown> */}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		);
	}
}
