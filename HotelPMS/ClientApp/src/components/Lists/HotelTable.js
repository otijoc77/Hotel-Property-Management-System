import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Rating from "@mui/material/Rating";
import "../../custom.css";

export function HotelTable(props) {
	const [state, setState] = useState({
		hotels: [],
		loading: true,
	});

	async function populateHotelData() {
		if (props.passedHotels == null) {
			const response = await fetch("api/hotels");
			const data = await response.json();
			setState({
				...state,
				hotels: data,
				loading: false,
			});
		} else {
			setState({
				...state,
				hotels: props.passedHotels,
				loading: false,
			});
		}
	}

	useEffect(() => {
		populateHotelData();
	}, []);

	function renderHotelsTable(hotels) {
		return (
			<div className="w-75">
				{hotels.map((hotel) => (
					<div
						className="card p-2 margin-b-20"
						key={hotel.id}
						onClick={(e) => (window.location.href = "/hotel/" + hotel.id)}
					>
						<Row className="margin-b-0">
							<Col>
								<img
									src={hotel.image}
									width={100}
									className="rounded border border-dark"
								/>
							</Col>
							<Col>
								<h4>
									<strong>{hotel.name}</strong>
								</h4>
								<Rating value={hotel.rating} size="small" readOnly />
							</Col>
							<Col>
								<p>
									<strong>{hotel.city.name}</strong>
								</p>
								<p>
									<strong>{hotel.address}</strong>
								</p>
							</Col>
							<Col>
								<p>Type:</p>
								<p>
									<strong>{hotel.type}</strong>
								</p>
							</Col>
						</Row>
					</div>
				))}
			</div>
		);
	}

	return (
		<div>
			<p>Registered hotels:</p>
			{state.loading ? (
				<p>
					<em>Loading...</em>
				</p>
			) : state.hotels.length == 0 ? (
				<p>
					<em>No registered hotels.</em>
				</p>
			) : (
				renderHotelsTable(state.hotels)
			)}
		</div>
	);
}
