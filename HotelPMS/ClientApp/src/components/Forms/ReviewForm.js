﻿import React, { useState, Component } from "react";
import { Row, Col } from "reactstrap";
import Rating from "@mui/material/Rating";
import "../../custom.css";
import { useAuth } from "../Functions/UserProvider";
import { useParams } from "react-router-dom";

export default function ReviewForm() {
	const { id } = useParams();
	const { cookies } = useAuth();

	const [rating, setRating] = useState(0);
	const [text, setText] = useState("");
	const [anonymous, setAnonimity] = useState(false);

	async function handleClick(e) {
		e.preventDefault();
		window.location.reload(false);
		await fetch("api/reviews", {
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				rating: rating,
				text: text,
				anonymous: anonymous,
				hotelId: id,
				userId: cookies.user,
			}),
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<>
			{cookies.level == "Client" && (
				<div className="card w-75 p-2">
					<form>
						<Row>
							<Col>
								<div className="form-group">
									<label>Rating:&nbsp;</label>
									<Rating
										className="align-middle"
										name="simple-controlled"
										value={rating}
										onChange={(e) => setRating(e.target.value)}
									/>
								</div>
							</Col>
							<Col>
								<div className="form-group">
									<input
										type="checkbox"
										className="form-check-input"
										id="check"
										value={anonymous}
										onChange={(e) => setAnonimity(!anonymous)}
									/>
									<label>Anonymous</label>
								</div>
							</Col>
						</Row>
						<div className="form-group">
							<label>Comment:</label>
							<textarea
								name="text"
								className="form-control w-75"
								placeholder="Comment"
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
						<button
							type="button"
							className="btn btn-dark"
							onClick={(e) => handleClick(e)}
						>
							Submit
						</button>
					</form>
				</div>
			)}
		</>
	);
}
