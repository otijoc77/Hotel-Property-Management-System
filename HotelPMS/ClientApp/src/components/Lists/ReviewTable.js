import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import "../../custom.css";
import ReviewForm from "../Forms/ReviewForm";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
	"& .MuiRating-icon": {
		color: "mistyrose",
	},
});

export function ReviewTable(props) {
	const [state, setState] = useState({
		reviews: [],
		loading: true,
	});

	useEffect(() => {
		setState({ reviews: props.hotelReviews, loading: false });
		console.log(props);
	}, []);

	function renderReviewsTable(reviews) {
		return (
			<div>
				{reviews.map((review) => (
					<div className="card w-50 margin-b-5 border-danger" key={review.id}>
						<div className="card-header text-white bg-danger">
							<Row>
								<Col>
									<p className="bold">
										{review.anonymous ? "Anonymous" : "User"}
									</p>
								</Col>
								<Col className="text-r">
									<StyledRating name="rating" value={review.rating} readOnly />
								</Col>
							</Row>
						</div>
						<div className="card-body bg-transparent">{review.text}</div>
					</div>
				))}
			</div>
		);
	}

	let contents = state.loading ? (
		<p>
			<em>Loading...</em>
		</p>
	) : state.reviews.length == 0 ? (
		<p>
			<em>No reviews.</em>
		</p>
	) : (
		renderReviewsTable(state.reviews)
	);

	return (
		<>
			<div className="w-100 d-table">
				<h2 className="d-table-cell">Reviews</h2>
			</div>
			<ReviewForm />
			{contents}
		</>
	);
}
