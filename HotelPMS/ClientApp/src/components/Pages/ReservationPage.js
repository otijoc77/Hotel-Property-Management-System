import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { RequestForm } from '../Forms/RequestForm';
import withParams from '../../hooks/withParameters';

class ReservationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            id: this.props.params.id
        };
    }

    getReservation() {
        fetch('api/reservations/' + this.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ reservation: data, loaded: true });
            })
    }

    cancelClick() {
        fetch('api/reservations/' + this.state.id, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        window.location.href = '/reservation-list';
    }

    checkIn() {
        this.setState(state => ({
            reservation: {
                ...state.reservation,
                checkedIn: true
            }
        }));
        fetch('api/reservations/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.reservation.id,
                start: this.state.reservation.start,
                end: this.state.reservation.end,
                userId: this.state.reservation.userId,
                hotelId: this.state.reservation.hotelId,
                roomId: this.state.reservation.roomId,
                checkedIn: true,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.getReservation();
    }

    render() {
        return (
            <Layout>
                {this.state.loaded &&
                    <Container>
                        <Row>
                            <h1 id="name" >Hotel: <strong>{this.state.reservation.hotel.name}</strong></h1>
                            <h2 id="number" >Room number: <strong>{this.state.reservation.room.number}</strong></h2>
                        </Row>
                        <Row>
                            <Col>
                                <div className='card p-3'>
                                    <Row>
                                        <label>Address:</label>
                                        <p className="bold">{this.state.reservation.hotel.address}</p>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label>Room type:</label>
                                            <p className="bold">{this.state.reservation.room.type}</p>
                                        </Col>
                                        <Col>
                                            <label>Beds:</label>
                                            <p className="bold">{this.state.reservation.room.beds}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <button className="btn btn-dark w-100p margin-2" onClick={e => this.checkIn()} >Check In</button>
                                        <button className="btn btn-danger btn-red w-100p margin-2" onClick={e => this.cancelClick()} >Cancel</button>
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <div className="card">
                                    {this.state.reservation.room.image != "" && <img src={this.state.reservation.room.image} className="img-fluid" alt="Room" />}
                                </div>
                            </Col>
                        </Row>
                        <RequestForm senderId={this.state.id}/>
                    </Container>
                }
            </Layout>
        )
    };
}

export default withParams(ReservationPage);