import React, { Component } from 'react';
import '../../custom.css';
import dayjs from 'dayjs';
import { Layout } from '../Layout';

export class ReservationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            userId: 0,
            loading: true
        };
    }

    async getReservations() {
        const response = await fetch('api/reservations/user/' + this.state.userId);
        const data = await response.json();
        this.setState({ reservations: data, loading: false });
    }

    componentDidMount() {
        this.getReservations();
    }

    handleRowClick() {
        window.location.href = '/reservation/:id';
    }

    static renderRservationsTable(reservations) {
        return (
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th>Hotel</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => reservation.registered != null &&
                            <tr key={reservation.id} onClick={() => this.handleRowClick(reservation.Id)}>
                                <td>{reservation.hotel.name}</td>
                                <td><a href={"/reservation/" + reservation.id} >{reservation.room.number}</a></td>
                                <td>
                                    {
                                        dayjs(reservation.start).get('year')
                                    }-{
                                        dayjs(reservation.start).get('month') < 9 ?
                                            "0" + (dayjs(reservation.start).get('month') + 1) :
                                            (dayjs(reservation.start).get('month') + 1)
                                    }-{
                                        dayjs(reservation.start).get('date') < 10 ?
                                            "0" + dayjs(reservation.start).get('date') :
                                            dayjs(reservation.start).get('date')
                                    }
                                </td>
                                <td>
                                    {
                                        dayjs(reservation.end).get('year')
                                    }-{
                                        dayjs(reservation.end).get('month') < 9 ?
                                            "0" + (dayjs(reservation.end).get('month') + 1) :
                                            (dayjs(reservation.end).get('month') + 1)
                                    }-{
                                        dayjs(reservation.end).get('date') < 10 ?
                                            "0" + dayjs(reservation.end).get('date') :
                                            dayjs(reservation.end).get('date')
                                    }
                                </td>
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
            : this.state.reservations.length == 0
                ? <p><em>No reservations.</em></p>
                : ReservationList.renderRservationsTable(this.state.reservations);

        return (
            <Layout>
                <h1 id="tabelLabel" >Reservations</h1>
                {contents}
            </Layout>
        );
    }
}