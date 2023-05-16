import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import { Header } from "./Navigation/Header";
import { NavMenu } from "./Navigation/NavMenu";

export class Layout extends Component {
	static displayName = Layout.name;

	render() {
		return (
			<div>
				<Header />
				<Row className="h-100 w-100 mx-0 flex-sm-nowrap">
					<Col sm="4" md="4" lg="3" xl="2" className="d-flex flex-column">
						<NavMenu />
					</Col>
					<Col className="d-flex flex-column g-0 flex-fill">
						<Container>{this.props.children}</Container>
					</Col>
				</Row>
			</div>
		);
	}
}
