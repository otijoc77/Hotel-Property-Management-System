import React, { useState, Component } from 'react';
import { useParams } from "react-router-dom";
import Rating from '@mui/material/Rating';
import '../../custom.css';

export function ReviewFormFunction(hotelId) {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");

    async function handleClick() {
        await fetch('api/reviews', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                rating: rating,
                text: text,
                hotelId: hotelId.hotelId,
                userId: "0",
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card w-75 p-2">
            <form>
                <div className="form-group">
                    <label>Rating:&nbsp;</label>
                    <Rating className="align-middle" name="simple-controlled" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Comment:</label>
                    <textarea name="text" className="form-control w-75" placeholder="Comment" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-dark" onClick={handleClick}>Submit</button>
            </form>
        </div>
    );
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { hotelId: this.props.params.id };
    }

    render() {
        return (
            <ReviewFormFunction hotelId={this.state.hotelId} />
        )
    };
}

export default withParams(ReviewForm);