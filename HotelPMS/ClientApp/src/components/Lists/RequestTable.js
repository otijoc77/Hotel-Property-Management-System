import React, { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import '../../custom.css';
import ServiceTypes from '../../enums/ServiceTypes';
import { useAuth } from '../Functions/UserProvider';

export function RequestTable(props) {
    const { cookies } = useAuth();

    const [state, setState] = useState({
        requests: [],
    });

    useEffect(() => {
        setState({
            requests: props.propRequests,
        });
    }, []);

    async function takeTask(request) {
        console.log(request);
        await fetch('api/requests/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: request.id,
                date: request.date,
                type: request.type,
                state: 1,
                comment: request.comment,
                senderId: request.senderId,
                employeeId: cookies.user,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        window.location.reload(false);
    }

    async function close(request) {
        console.log(request);
        await fetch('api/requests/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: request.id,
                date: request.date,
                type: request.type,
                state: 2,
                comment: request.comment,
                senderId: request.senderId,
                employeeId: request.employeeId,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
        window.location.reload(false);
    }

    return (
        <>
            {state.requests.length == 0 || state.requests.length == undefined
                ? <p><em>No requests.</em></p>
                :
                <div>
                    {state.requests.map(request =>
                        <div className="card p-2 margin-b-20" key={request.id}>
                            <p>{!isNaN(+request.type)
                                ? ServiceTypes.find((type) => { if (parseInt(type.value) == request.type) return type }).label
                                : request.type}</p>
                            <Row>
                                <Col>
                                    <p>{request.comment}</p>
                                </Col>
                                {(request.state == "Open" || request.state == 0) &&
                                    <Col>
                                        <button className="btn btn-dark w-100p margin-2" onClick={() => takeTask(request)} >Take</button>
                                    </Col>
                                }
                                {(request.state == "InProgress" || request.state == 1) && request.employeeId == cookies.user &&
                                    <Col>
                                        <button className="btn btn-dark w-100p margin-2" onClick={() => close(request)} >Close</button>
                                    </Col>
                                }
                            </Row>
                        </div>
                    )}
                </div>
            }
        </>
    );
}