import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Rating from '@mui/material/Rating';
import '../../custom.css';

export class HotelTable extends Component {
    constructor(props) {
        super(props);
        this.state = { hotels: [], loading: true };
    }

    async populateHotelData() {
        if (this.props.passedHotels == null) {
            const response = await fetch('api/hotels');
            const data = await response.json();
            this.setState({ hotels: data, loading: false });
        }
        else {
            this.setState({ hotels: this.props.passedHotels, loading: false });
        }
    }

    componentDidMount() {
        this.populateHotelData();
    }
    //TODO: map type to frontend types and search
    static renderHotelsTable(hotels) {
        return (
            <div className="w-75">
                {hotels.map(hotel =>
                    <div className="card p-2 margin-b-20" key={hotel.id}>
                        <Row className="margin-b-0">
                            <Col>
                                <img
                                    src={hotel.image}
                                    width={100}
                                />
                            </Col>
                            <Col>
                                <h4><a href={"/hotel/" + hotel.id} >{hotel.name}</a></h4>
                                <Rating value={hotel.rating} size="small" readOnly />
                            </Col>
                            <Col>
                                {/*<p>{hotel.city.name}</p>*/}
                                <p>{hotel.address}</p>
                            </Col>
                            <Col>
                                <p>{hotel.type}</p>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.hotels.length == 0
                ? <p><em>No registered hotels.</em></p>
                : HotelTable.renderHotelsTable(this.state.hotels);

        return (
            <div>
                <p>Registered hotels:</p>
                {contents}
            </div>
        );
    }
}