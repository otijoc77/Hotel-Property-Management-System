import React, { useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Rating from '@mui/material/Rating';
import '../../custom.css';
import { Layout } from '../Layout';
import { ReviewTable } from '../Lists/ReviewTable';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function HotelPage() {
    const { id } = useParams();

    const link_edit = '/hotel/' + id + '/edit';
    const link_floorplan = '/hotel/' + id + '/floorplan';

    const [state, setState] = useState({
        hotel: { id: 0, name: "", address: "", image: "", cityId: 0, rating: 0, type: 0, roomClassification: 0, reviews: [] },
        loaded: false,
    });

    async function getHotel() {
        await fetch('api/hotels/' + id)
            .then(response => response.json())
            .then(data => {
                setState({ hotel: data, loaded: true });
            })
    }

    useEffect(() => {
        getHotel();
    }, []);

    async function deleteClick() {
        await fetch('api/hotels/' + id, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <h1 id="name" >{state.hotel.name}</h1>
                    <Rating name="rating" value={state.hotel.rating} size="large" readOnly />
                </Row>
                <Row>
                    <Col>
                        <div className="card p-3">
                            <Row>
                                <label>Address:</label>
                                <p className="bold">{state.hotel.address}</p>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Type:</label>
                                    <p className="bold">{state.hotel.type}</p>
                                </Col>
                                <Col>
                                    <label>Room classification:</label>
                                    <p className="bold">{state.hotel.roomClassification}</p>
                                </Col>
                            </Row>
                            <Row>
                                <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = link_edit} >Edit</button>
                                <button className="btn btn-danger btn-red w-100p margin-2" onClick={e => deleteClick()} >Delete</button>
                            </Row>
                            <Row>
                                <button className="btn btn-dark w-200p margin-b-5 margin-2" onClick={e => window.location.href = link_floorplan} >Floorplan</button>
                                <button className="btn btn-dark w-200p margin-b-5 margin-2" >Make Reservation</button>
                            </Row>
                        </div>
                    </Col>
                    <Col>
                        <div className="card border-dark">
                            {state.hotel.image != "" && <img src={state.hotel.image} className="rounded img-fluid" alt="Hotel" />}
                        </div>
                    </Col>
                </Row>
                <Row className="p-3">
                    {state.loaded && < ReviewTable hotelReviews={state.hotel.reviews} />}
                </Row>
            </Container>
        </Layout>
    );
}