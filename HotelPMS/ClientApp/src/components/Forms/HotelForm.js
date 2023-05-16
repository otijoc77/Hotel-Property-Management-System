import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "../../custom.css";
import HotelTypes from "../../enums/HotelTypes";
import RoomClassifications from "../../enums/RoomClassifications";
import { Layout } from "../Layout";
import { useParams } from "react-router-dom";
import { useAuth } from "../Functions/UserProvider";

export default function HotelForm() {
	const { companyId } = useParams();
	const { cookies } = useAuth();

	const link_back = "/company/" + companyId;

	const MAX_LATITUDE_LENGTH = 90;
	const MIN_LATITUDE_LENGTH = -90;
	const MAX_LONGITUDE_LENGTH = 180;
	const MIN_LONGITUDE_LENGTH = -180;

	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [image, setImage] = useState("");
	const [rating, setRating] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [type, setType] = useState("");
	const [roomClassification, setClassification] = useState("");
	const [city, setCity] = useState("");
	const [cities, setCities] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (cookies.name == undefined) {
			window.location.href = "/login";
		}
		if (cookies.level != "Admin" && cookies.level != "Owner") {
			window.location.href = "/unauthorised";
		}
		fetch("api/cities")
			.then((response) => response.json())
			.then((data) => {
				setCities(data);
				setLoaded(true);
			});
	}, []);

	async function handleClick(e) {
		e.preventDefault();
		const company = companyId;
		if (name != "" || address != "") {
			window.location.href = link_back;
			await fetch("api/hotels", {
				method: "POST",
				mode: "cors",
				headers: {
					Accept: "application/json",
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					address: address,
					image: image,
					cityId: city,
					rating: rating,
					latitude: latitude,
					longitude: longitude,
					type: type,
					roomClassification: roomClassification,
					companyId: company,
				}),
			})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return (
		<Layout>
			<div className="w-100 d-table">
				<h1 id="header" className="d-table-cell">
					Register hotel
				</h1>
				<div className="d-table-cell text-r">
					<button
						className="btn btn-dark"
						onClick={(e) => (window.location.href = link_back)}
					>
						Back
					</button>
				</div>
			</div>
			<form>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						className="form-control w-50"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Address:</label>
					<input
						type="text"
						name="address"
						className="form-control w-75"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Image url:</label>
					<input
						type="text"
						name="image"
						className="form-control w-75"
						placeholder="Image"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					<small id="imageHelp" className="form-text text-muted">
						Optional image url for hotel.
					</small>
				</div>
				<div className="form-group">
					<label>City:</label>
					<select
						name="city"
						className="form-select w-50"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
					>
						<option defaultValue="">Select city</option>
						{loaded &&
							cities.map((city) => (
								<option value={city.id} key={city.id}>
									{city.name}
								</option>
							))}
					</select>
				</div>
				<div className="form-group">
					<label>Rating:</label>
					<br />
					<Rating
						name="simple-controlled"
						size="large"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
					/>
				</div>
				<div className="row w-50">
					<div className="form-group col">
						<label>Latitude:</label>
						<input
							type="number"
							name="latitude"
							className="form-control w-100"
							value={latitude}
							onChange={(e) => setLatitude(e.target.value)}
							required
						/>
						<small id="latitudeHelp" className="form-text text-muted">
							Range from -90 to 90.
						</small>
					</div>
					<div className="form-group col">
						<label>Longitude:</label>
						<input
							type="number"
							name="longitude"
							className="form-control w-100"
							value={longitude}
							onChange={(e) => setLongitude(e.target.value)}
							required
						/>
						<small id="longitudeHelp" className="form-text text-muted">
							Range from -180 to 180.
						</small>
					</div>
				</div>
				<div className="row w-50">
					<div className="form-group col">
						<label>Type:</label>
						<select
							name="type"
							className="form-select w-100"
							value={type}
							onChange={(e) => setType(e.target.value)}
							required
						>
							<option defaultValue="">Select hotel type</option>
							{HotelTypes.map((type) => (
								<option value={type.value} key={type.value}>
									{type.label}
								</option>
							))}
						</select>
					</div>
					<div className="form-group col">
						<label>Room Classification:</label>
						<select
							name="roomClassification"
							className="form-select w-100"
							value={roomClassification}
							onChange={(e) => setClassification(e.target.value)}
							required
						>
							<option defaultValue="">Select room classification type</option>
							{RoomClassifications.map((classification) => (
								<option value={classification.value} key={classification.value}>
									{classification.label}
								</option>
							))}
						</select>
					</div>
				</div>
				<button
					type="button"
					className="btn btn-dark"
					disabled={
						latitude < MIN_LATITUDE_LENGTH ||
						latitude > MAX_LATITUDE_LENGTH ||
						longitude < MIN_LONGITUDE_LENGTH ||
						longitude > MAX_LONGITUDE_LENGTH ||
						roomClassification == "" ||
						type == "" ||
						city == ""
					}
					onClick={(e) => handleClick(e)}
				>
					Register
				</button>
			</form>
		</Layout>
	);
}
