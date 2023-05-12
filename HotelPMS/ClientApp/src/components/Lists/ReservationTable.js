import React, { Component, useEffect, useState } from 'react';
import '../../custom.css';
import dayjs from 'dayjs';

export function ReservationTable(props) {
    const [state, setState] = useState({
        reservations: [],
        userId: props.userId,
        loading: true
    });

    async function getReservations() {
        const response = await fetch('api/reservations/user/' + state.userId);
        const data = await response.json();
        setState({ reservations: data, loading: false });
    }

    useEffect(() => {
        getReservations();
    }, []);

    let contents = state.loading
        ? <p><em>Loading...</em></p>
        : state.reservations.length == 0
            ? <p><em>No reservations.</em></p>
            :
            <>
                <h3 id="tabelLabel" >Reservations</h3>
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
                            {state.reservations.map(reservation => reservation.registered != null &&
                                <tr key={reservation.id} onClick={() => window.location.href = '/reservation/' + reservation.Id}>
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
            </>;

    return (
        <>
            {contents}
        </>
    );
}