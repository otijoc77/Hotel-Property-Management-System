import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "reactstrap";
import "../../custom.css";
import { useAuth } from "../Functions/UserProvider";
import { Layout } from "../Layout";
import { RequestTable } from "../Lists/RequestTable";
import { ReservationTable } from "../Lists/ReservationTable";

export function UserPage() {
	const { cookies } = useAuth();

	const [state, setState] = useState({
		user: {},
		id: cookies.user,
		loading: true,
	});

	const [requests, setRequests] = useState({
		list: [],
		loaded: false,
	});

	useEffect(() => {
		if (cookies.name == undefined) {
			window.location.href = "/login";
		}
		fetch("api/users/" + state.id)
			.then((response) => response.json())
			.then((data) => {
				setState({
					...state,
					user: data,
					loading: false,
				});
			});
	}, []);

	useEffect(() => {
		if (state.user.companyId != null) {
			fetch("api/requests/employee/" + state.id)
				.then((response) => response.json())
				.then((data) => {
					setRequests({
						...requests,
						list: data,
						loaded: true,
					});
					console.log("data", data);
				});
		}
	}, [state.loading]);

	return (
		<Layout>
			{!state.loading && (
				<Container>
					<h1>
						<em>{cookies.name}</em>
					</h1>
					<div className="card p-3 margin-b-20">
						<Row>
							<Col>
								<label>Name:</label>
								<p className="bold">
									{state.user.name} {state.user.surname}
								</p>
							</Col>
							<Col>
								<label>Gender:</label>
								<p className="bold">{state.user.gender}</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<label>Email:</label>
								<p className="bold">
									{state.user.email ? state.user.email : "-"}
								</p>
							</Col>
							<Col>
								<label>Phone number:</label>
								<p className="bold">
									{state.user.phoneNumber ? state.user.phoneNumber : "-"}
								</p>
							</Col>
						</Row>
					</div>
					{cookies.level != "Admin" && <ReservationTable userId={state.id} />}
					{requests.loaded && <RequestTable propRequests={requests} />}
				</Container>
			)}
		</Layout>
	);
}
