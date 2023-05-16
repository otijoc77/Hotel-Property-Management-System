import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import { HotelTable } from "../Lists/HotelTable";
import "../../custom.css";
import { Layout } from "../Layout";
import { UserTable } from "../Lists/UserTable";
import { useParams } from "react-router-dom";
import { useAuth } from "../Functions/UserProvider";

export default function CompanyPage() {
	const size = 150;
	const { id } = useParams();
	const link_hotel = "/company/" + id + "/hotel-register";
	const link_back = "/company-list";
	const link_company = "/company/" + id + "/edit";
	const { cookies } = useAuth();

	const [state, setState] = useState({
		company: {
			id: 0,
			code: "",
			name: "",
			description: "",
			hotels: [],
			employees: [],
		},
		id: id,
		loaded: false,
	});

	async function getCompany() {
		await fetch("api/companies/" + state.id)
			.then((response) => response.json())
			.then((data) => {
				setState({ company: data, loaded: true });
			});
	}

	async function deleteClick() {
		window.location.href = link_back;
		await fetch("api/companies/" + state.id, {
			method: "DELETE",
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getCompany();
	}, []);

	return (
		<Layout>
			<Container>
				<Row className="w-25">
					<Col>
						{state.company.logo != null && state.company.logo != "" && (
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
									href={state.company.logo}
								/>
							</svg>
						)}
					</Col>
					<Col>
						<h1 id="name" className="">
							{state.company.name}
						</h1>
					</Col>
				</Row>
				<p>{state.company.description}</p>
				{cookies.level == "Admin" || cookies.level == "Owner" ? (
					<>
						<Row>
							<button
								className="btn btn-dark w-100p margin-2"
								onClick={(e) => (window.location.href = link_company)}
							>
								Edit
							</button>
							<button
								className="btn btn-danger btn-red w-100p margin-2"
								onClick={(e) => deleteClick()}
							>
								Delete
							</button>
						</Row>
						<Row>
							<button
								className="btn btn-dark w-200p margin-b-5 margin-2"
								onClick={(e) => (window.location.href = link_hotel)}
							>
								Register new hotel
							</button>
						</Row>
					</>
				) : (
					<></>
				)}
				{state.loaded && (
					<>
						<HotelTable passedHotels={state.company.hotels} />
						{cookies.level == "Admin" || cookies.level == "Owner" ? (
							state.company.employees.length > 0 ? (
								<UserTable users={state.company.employees} admin={false} />
							) : (
								<p>
									<em>No registered employees.</em>
								</p>
							)
						) : (
							<></>
						)}
					</>
				)}
			</Container>
		</Layout>
	);
}
