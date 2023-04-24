import React, { useState } from 'react';
import '../../custom.css';
import { Row } from 'reactstrap';
import ServiceTypes from '../../enums/ServiceTypes';

export function RequestForm(props) {
    const [type, setType] = useState();
    const [comment, setComment] = useState("");

    async function handleClick(e) {
        e.preventDefault();
        window.location.reload(false);
        await fetch('api/requests', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                type: type,
                comment: comment,
                senderId: props.senderId,
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
            <div className="w-100 d-table">
                <h1 id="header" className="d-table-cell">What seems to be the problem?</h1>
            </div>
            <form>
                <div className="form-group">
                    <Row>
                        <label>Type:&nbsp;</label>
                        <select name="type" className="form-select w-100" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option defaultValue="">Select service type</option>
                            {ServiceTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}
                        </select>
                    </Row>
                </div>
                <div className="form-group">
                    <label>To:</label>
                    <textarea name="comment" className="form-control w-75" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>
                <button type="button" className="btn btn-dark" disabled={start == undefined || end == undefined} onClick={(e) => handleClick(e)}>Register</button>
            </form>
        </>
    );
}