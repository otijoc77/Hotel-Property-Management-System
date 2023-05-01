import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Rating from '@mui/material/Rating';
import '../../custom.css';

export function HotelTable(props) {
    const [state, setState] = useState({
        hotels: [],
        loading: true
    });

    async function populateHotelData() {
        if (props.passedHotels == null) {
            const response = await fetch('api/hotels');
            const data = await response.json();
            setState({
                ...state,
                hotels: data,
                loading: false
            });
        }
        else {
            setState({
                ...state,
                hotels: props.passedHotels,
                loading: false
            });
        }
    }

    useEffect(() => {
        populateHotelData();
    }, []);
    //TODO: map type to frontend types and search
    function renderHotelsTable(hotels) {
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

    return (
        <div>
            <p>Registered hotels:</p>
            {state.loading
                ? <p><em>Loading...</em></p>
                : state.hotels.length == 0
                    ? <p><em>No registered hotels.</em></p>
                    : renderHotelsTable(state.hotels)}
        </div>
    );
}