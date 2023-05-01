import React, { useEffect, useState } from 'react';
import '../../custom.css';
import ServiceTypes from '../../enums/ServiceTypes';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

export function RequestForm(props) {
    const [type, setType] = useState();
    const [comment, setComment] = useState("");
    const [connection, setConnection] = useState(null);

    async function handleClick(e) {
        if (type != undefined || comment != "") {
            if (connection._connectionStarted) {
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
                    .catch(error => {
                        console.log(error);
                    });
            }
            else {
                alert('No connection to server yet.');
            }
        }
    }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7299/hubs/requests', {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    return (
        <>
            <div className="w-100 d-table margin-b-5">
                <h3 id="header" className="d-table-cell">What seems to be the problem?</h3>
            </div>
            <div className="card w-75 p-2">
                <form>
                    <div className="form-group">
                        <label>Type:&nbsp;</label>
                        <select name="type" className="form-select w-50" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option defaultValue="">Select service type</option>
                            {ServiceTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea name="comment" className="form-control w-75" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required/>
                    </div>
                    <button type="button" className="btn btn-dark" onClick={(e) => handleClick(e)}>Submit</button>
                </form>
            </div>
        </>
    );
}