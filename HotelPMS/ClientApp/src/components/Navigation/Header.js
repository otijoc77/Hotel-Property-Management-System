import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../Functions/UserProvider";

export function Header() {
	const { cookies, logout } = useAuth();

	const [state, setState] = useState({
		collapsed: true,
	});

	function toggleNavbar() {
		setState({
			collapsed: !state.collapsed,
		});
	}

	function Logout() {
		return (
			<NavItem>
				<button className="text-light nav-link pt" onClick={(e) => logout()}>
					Logout
				</button>
			</NavItem>
		);
	}
	//TODO: delete console log
	return (
		<header className="wide">
			{console.log(cookies.name + " " + cookies.level)}
			<Navbar
				className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 color"
				container
				light
			>
				<NavbarBrand className="text-light title" tag={Link} to="/">
					HOLTLEY
				</NavbarBrand>
				{cookies.name != undefined && (
					<NavLink className="text-light" tag={Link} to="/">
						<em>{cookies.level}</em>
					</NavLink>
				)}
				<NavbarToggler onClick={(e) => toggleNavbar()} className="mr-2" />
				<Collapse
					className="d-sm-inline-flex flex-sm-row-reverse"
					isOpen={!state.collapsed}
					navbar
				>
					<ul className="navbar-nav flex-grow">
						{cookies.name != undefined && (
							<NavItem>
								<NavLink tag={Link} className="text-light" to="/">
									<em>{cookies.name}</em>
								</NavLink>
							</NavItem>
						)}
						<NavItem>
							<NavLink tag={Link} className="text-light" to="/">
								Home
							</NavLink>
						</NavItem>
						{cookies.name == undefined && (
							<>
								<NavItem>
									<NavLink tag={Link} className="text-light" to="/login">
										Login
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={Link} className="text-light" to="/register">
										Register
									</NavLink>
								</NavItem>
							</>
						)}
						{cookies.name != undefined && <Logout />}
					</ul>
				</Collapse>
			</Navbar>
		</header>
	);
}
