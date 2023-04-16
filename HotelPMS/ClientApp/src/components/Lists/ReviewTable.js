import React, { Component } from 'react';
import '../../custom.css';
import ReviewForm from '../Forms/ReviewForm';

export class ReviewTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ reviews: this.props.hotelReviews, loading: false });
    }

    static renderReviewsTable(reviews) {
        return (
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th>Rating</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review =>
                            <tr key={review.id}>
                                <td>{review.rating}</td>
                                <td>{review.text}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.reviews.length == 0
                ? <p><em>No reviews.</em></p>
                : ReviewTable.renderReviewsTable(this.state.reviews);

        return (
            <>
                <div className="w-100 d-table">
                    <h2 className="d-table-cell">Reviews</h2>
                </div>
                <ReviewForm/>
                {contents}
            </>
        );
    }
}