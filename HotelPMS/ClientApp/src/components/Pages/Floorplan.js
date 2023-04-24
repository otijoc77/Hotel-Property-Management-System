import React, { Component, useEffect, useRef, useState } from 'react';
import { Row } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ReservationForm } from '../Forms/ReservationForm';

function FloorplanFunction(props) {
    //const [style, setStyle] = useState({ fill: "lime", opacity: "50%" });
    const [url, setUrl] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [show, setShow] = useState(false);
    const [state, setState] = useState({
        floors: [],
        currentFloorIndex: -1,
        currentFloorId: 0,
        currentRoomId: 0,
        hotelId: props.hotelId,
        link_add: '/hotel/' + props.hotelId + '/floor-register',
        link_room: '/hotel/' + props.hotelId + '/floor/',
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const Requests = () => {
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

    const Reservation = () => {
        const handleClose = () => setShow(false);

        return (
            <Modal open={show} onClose={handleClose}>
                <Box sx={style}>
                    <ReservationForm
                        userId={0}
                        hotelId={state.hotelId}
                        roomId={state.currentRoomId}
                    />
                </Box>
            </Modal>
        );
    };

    function roomClick(room) {
        setState({ ...state, currentRoomId: room.id });
        setShow(true);
    };

    useEffect(() => {
        setUrl(window.location.href);
        fetch('api/floors/hotel/' + state.hotelId)
            .then(response => response.json())
            .then(data => {
                setState({ ...state, floors: data });
                setLoaded(true);
            });
    }, []);

    const Render = () => {
        return (
            <Layout>
                <Reservation/>
                <h1 id="header" >Floorplan</h1>
                <div className="form-group">
                    <label>Floor:</label>
                    <Row className="m-1">
                        <select name="floor" className="form-select w-50" value={state.currentFloorIndex} onChange={(e) => { setState({ ...state, currentFloorIndex: e.target.value, currentFloorId: state.floors[e.target.value].id }); window.history.replaceState(null, '', url + "/" + state.floors[e.target.value].id) }}>
                            <option defaultValue="-1" >Select floor</option>
                            {state.floors.map((floor, index) => <option value={index} key={floor.id}>{floor.number}</option>)}
                        </select>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = state.link_add} >Add new</button>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = state.link_room + state.currentFloorId} disabled={state.currentFloorId == 0}>Add room</button>
                    </Row>
                    {state.currentFloorId != 0 &&
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
                                href={state.floors[state.currentFloorIndex].floorplan}
                            />
                            {state.floors[state.currentFloorIndex].rooms.map((room) => <polygon key={room.id} points={room.border} style={{ fill: "lime", opacity: "50%" }} onClick={e => roomClick(room)} />)}
                        </svg>}
                </div>
            </Layout >
        );
    };

    return (
        <>
            {loaded && <Render />}
        </>
    );
};

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Floorplan extends Component {
    constructor(props) {
        super(props);
        this.state = { hotelId: this.props.params.hotelId };
    }

    render() {
        return (
            <FloorplanFunction hotelId={this.state.hotelId} />
        )
    };
}

export default withParams(Floorplan);