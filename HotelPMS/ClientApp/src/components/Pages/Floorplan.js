import React, { Component, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { Row } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { HubConnectionBuilder } from '@microsoft/signalr';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Floorplan extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            floors: [],
            currentFloorIndex: -1,
            currentFloorId: 0,
            hotelId: this.props.params.hotelId,
            link_add: '/hotel/' + this.props.params.hotelId + '/floor-register',
            link_room: '/hotel/' + this.props.params.hotelId + '/floor/',
        };
    }

    Requests = () => {
        const [connection, setConnection] = useState(null);
        const [chat, setChat] = useState([]);
        const latestChat = useRef(null);

        latestChat.current = chat;

        useEffect(() => {
            const newConnection = new HubConnectionBuilder()
                .withUrl('https://localhost:5001/hubs/chat')
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        }, []);

        useEffect(() => {
            if (connection) {
                connection.start()
                    .then(result => {
                        console.log('Connected!');

                        connection.on('ReceiveMessage', message => {
                            const updatedChat = [...latestChat.current];
                            updatedChat.push(message);

                            setChat(updatedChat);
                        });
                    })
                    .catch(e => console.log('Connection failed: ', e));
            }
        }, [connection]);

        const sendMessage = async (user, message) => {
            const chatMessage = {
                user: user,
                message: message
            };

            if (connection.connectionStarted) {
                try {
                    await connection.send('SendMessage', chatMessage);
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                alert('No connection to server yet.');
            }
        }

        return (
            <div>
            </div>
        );
    };

    getFloors() {
        fetch('api/floors/hotel/' + this.state.hotelId)
            .then(response => response.json())
            .then(data => {
                this.setState({ floors: data });
                console.log(data)
            })
    }

    componentDidMount() {
        this.getFloors();
    }

    render() {
        return (
            <Layout>
                <h1 id="header" >Floorplan</h1>
                <div className="form-group">
                    <label>Floor:</label>
                    <Row className="m-1">
                        <select name="floor" className="form-select w-50" value={this.state.currentFloorIndex} onChange={(e) => {this.setState({ currentFloorIndex: e.target.value, currentFloorId: this.state.floors[e.target.value].id })}}>
                            <option defaultValue="-1" >Select floor</option>
                            {this.state.floors.map((floor, index) => <option value={index} key={floor.id}>{floor.number}</option>)}
                        </select>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = this.state.link_add} >Add new</button>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = this.state.link_room + this.state.currentFloorId} disabled={this.state.currentFloorId == 0}>Add room</button>
                    </Row>
                    {this.state.currentFloorId != 0 &&
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={1000}
                            height={1000}
                        >
                            <image
                                display="flex"
                                overflow="visible"
                                width={1000}
                                height={1000}
                                href={this.state.floors[this.state.currentFloorIndex].floorplan}
                            />
                            {this.state.floors[this.state.currentFloorIndex].rooms.map((room) => <polygon key={room.id} points={room.border} style={{ fill: "lime", opacity: "50%" }} />)}
                            {/*<polygon
                                points={border}
                            />*/}
                        </svg>}
                </div>
            </Layout>
        )
    };
}

export default withParams(Floorplan);