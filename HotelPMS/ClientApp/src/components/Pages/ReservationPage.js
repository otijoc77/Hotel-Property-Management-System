import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../../custom.css';
import dayjs from 'dayjs';
import { Layout } from '../Layout';
import { RequestForm } from '../Forms/RequestForm';
import { useAuth } from '../Functions/UserProvider';
import { useParams } from 'react-router-dom';

export default function ReservationPage() {
    const { id } = useParams();
    const { cookies } = useAuth();

    const [state, setState] = useState({
        reservation: {
            id: 0,
            registered: new Date(),
            start: new Date(),
            end: new Date(),
            userId: 0,
            user: {},
            hotelId: 0,
            hotel: {},
            roomId: 0,
            room: {},
            checkedIn: false,
        },
        loaded: false,
        id: id
    });

    async function getReservation() {
        await fetch('api/reservations/' + state.id)
            .then(response => response.json())
            .then(data => {
                setState({ reservation: data, loaded: true })
            })
    };

    async function cancelClick() {
        await fetch('api/reservations/' + state.id, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        window.location.href = '/reservation-list';
    };

    async function checkIn() {
        setState(state => ({
            reservation: {
                ...state.reservation,
                checkedIn: true
            }
        }));
        await fetch('api/reservations/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: state.reservation.id,
                registered: state.reservation.registered,
                start: state.reservation.start,
                end: state.reservation.end,
                userId: state.reservation.userId,
                hotelId: state.reservation.hotelId,
                roomId: state.reservation.roomId,
                floorId: state.reservation.floorId,
                checkedIn: true,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        window.location.reload(false);
    };

    useEffect(() => {
        getReservation();
    }, []);

    return (
        <Layout>
            {state.loaded &&
                <Container>
                    <Row>
                        <h1 id="name" ><strong>{state.reservation.user.name} {state.reservation.user.surname}</strong></h1>
                        <h1 id="name" >Hotel: <strong>{state.reservation.hotel.name}</strong></h1>
                        <h2 id="number" >Room number: <strong>{state.reservation.room.number}</strong></h2>
                    </Row>
                    <Row>
                        <Col>
                            <div className="card p-3">
                                <Row>
                                    <label>Address:</label>
                                    <p className="bold">{state.reservation.hotel.address}</p>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Room type:</label>
                                        <p className="bold">{state.reservation.room.type}</p>
                                    </Col>
                                    <Col>
                                        <label>Beds:</label>
                                        <p className="bold">{state.reservation.room.beds}</p>
                                    </Col>
                                </Row>
                                {cookies.user == state.reservation.userId &&
                                    <Row>
                                        {!state.reservation.checkedIn && <button className="btn btn-dark w-100p margin-2" onClick={e => checkIn()} >Check In</button>}
                                        <button className="btn btn-danger btn-red w-100p margin-2" onClick={e => cancelClick()} >Cancel</button>
                                    </Row>
                                }
                            </div>
                        </Col>
                        <Col>
                            <div className="card border-dark">
                                {state.reservation.room.image != "" && <img src={state.reservation.room.image} className="rounded img-fluid" alt="Room" />}
                            </div>
                        </Col>
                    </Row>
                    {state.reservation.checkedIn && <RequestForm senderId={id} />}
                </Container>
            }
        </Layout>
    )
}