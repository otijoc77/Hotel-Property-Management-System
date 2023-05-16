import React, { Component, useEffect, useState } from "react";
import "../../custom.css";
import { Col, Row } from "reactstrap";
import { Layout } from "../Layout";
import { useAuth } from "../Functions/UserProvider";

export function CompanyList() {
	const size = 100;
	const { cookies } = useAuth();

	const [state, setState] = useState({
		companies: [],
		loading: true,
	});

	async function populateCompanyData() {
		const response = await fetch("api/companies");
		const data = await response.json();
		setState({ companies: data, loading: false });
	}

	useEffect(() => {
		populateCompanyData();
	}, []);

	function handleOnClick() {
		window.location.href = "/company-register";
	}

	function handleRowClick(id) {
		window.location.href = "/company/" + id;
	}

	let contents = state.loading ? (
		<p>
			<em>Loading...</em>
		</p>
	) : state.companies.length == 0 ? (
		<p>
			<em>No registered companies.</em>
		</p>
	) : (
		<div>
			{state.companies.map((company) => (
				<div
					className="card p-2 margin-b-20 border-light w-75"
					key={company.id}
					onClick={() => handleRowClick(company.id)}
				>
					<Row>
						<Col>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={size}
								height={size}
							>
								<image
									display="flex"
									overflow="visible"
									width={size}
									height={size}
									href={company.logo}
								/>
							</svg>
						</Col>
						<Col>
							<h1>{company.name}</h1>
						</Col>
						<Col xs={7}>
							<p>{company.description}</p>
						</Col>
					</Row>
				</div>
			))}
		</div>
	);

	return (
		<Layout>
			<h1 id="tabelLabel">Companies</h1>
			<div className="w-100 d-table margin-b-5">
				<p className="d-table-cell">Registered companies:</p>
				{cookies.level == "Admin" || cookies.level == "Owner" ? (
					<div className="d-table-cell text-r">
						<button className="btn btn-dark" onClick={handleOnClick}>
							Register new company
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
			{contents}
		</Layout>
	);
}
