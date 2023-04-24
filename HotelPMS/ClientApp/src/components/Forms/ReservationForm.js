﻿import React, { useState } from 'react';
import '../../custom.css';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Row, Col } from 'reactstrap';

export function ReservationForm(props) {
    const [start, setStart] = useState(dayjs());
    const [end, setEnd] = useState(dayjs().add(1, 'day'));
    //TODO: search for userId: 0 and change to current user id
    async function handleClick(e) {
        e.preventDefault();
        window.location.reload(false);
        await fetch('api/reservations', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                start: start,
                end: end,
                userId: props.userId,
                hotelId: props.hotelId,
                roomId: props.roomId,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <h1 id="header">Make reservation</h1>
            <form>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label>From:</label><br />
                            <DatePicker value={start} onChange={(e) => setStart(e)} disablePast />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>To:</label><br />
                            <DatePicker value={end} onChange={(e) => setEnd(e)} disablePast />
                        </div>
                    </Col>
                </Row>
                <button type="button" className="btn btn-dark" disabled={start == undefined || end == undefined} onClick={(e) => handleClick(e)}>Register</button>
            </form>
        </>
    );
}