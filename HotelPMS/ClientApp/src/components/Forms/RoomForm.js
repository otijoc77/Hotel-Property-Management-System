import React, { useState, Component } from 'react';
import { Row, Col } from 'reactstrap';
import '../../custom.css';
import AmenityRoomTypes from '../../enums/AmenityRoomTypes';
import BedRoomTypes from '../../enums/BedRoomTypes';
import LayoutRoomTypes from '../../enums/LayoutRoomTypes';
import OccupancyRoomTypes from '../../enums/OccupancyRoomTypes';
import SuiteRoomTypes from '../../enums/SuiteRoomTypes';
import withParams from '../../hooks/withParameters';
import DrawCanvas from '../Functions/DrawCanvas';
import { Layout } from '../Layout';

function RoomFormFunction(props) {
    const link_back = "/hotel/" + props.hotelId + "/floorplan";
    const pattern = /\b\d[\d,.]*\b/mg;

    const [number, setNumber] = useState(0);
    const [area, setArea] = useState(0);
    const [beds, setBedNumber] = useState(0);
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [border, setBorder] = useState("");
    const [points, setPoint] = useState();

    async function handleClick(e) {
        e.preventDefault();
        window.location.href = link_back;
        if (number != 0 || area != 0 || type != "" || border != "") {
            await fetch('api/rooms', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    number: number,
                    beds: beds,
                    price: price,
                    area: area,
                    type: type,
                    image: image,
                    border: border,
                    floorId: props.floorId,
                })
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const Types = (param) => {
        switch (param) {
            case 'Occupancy':
                return OccupancyRoomTypes;
            case 'Bed':
                return BedRoomTypes;
            case 'Layout':
                return LayoutRoomTypes;
            case 'Amenity':
                return AmenityRoomTypes;
            case 'Suite':
                return SuiteRoomTypes;
        }
    }

    const onDraw = (data) => {
        setPoint(data);
        var pointsJson = JSON.stringify(points);
        if (pointsJson == undefined) {
            setBorder("");
        }
        else {
            var match;
            while ((match = pattern.exec(pointsJson)) != null) {
                setBorder(border + match + ' ');
            }
        }
        console.log(pointsJson);
    };

    const viewRoom = (room) => {
        
    };

    return (
        <Layout>
            <div className="w-100 d-table">
                <h1 id="header" className="d-table-cell">Register room</h1>
                <div className="d-table-cell text-r">
                    <button className="btn btn-dark" onClick={e => window.location.href = link_back} >Back</button>
                </div>
            </div>
            <form>
                <Row className="w-75">
                    <Col>
                        <div className="form-group">
                            <label>Number:</label>
                            <input type="number" name="number" className="form-control w-100" value={number} onChange={(e) => setNumber(e.target.value)} required />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Area (m<sup>2</sup>):</label>
                            <input type="number" name="area" className="form-control w-100" value={area} onChange={(e) => setArea(e.target.value)} required />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Beds:</label>
                            <input type="number" name="beds" className="form-control w-100" value={beds} onChange={(e) => setBedNumber(e.target.value)} required />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Price for night:</label>
                            <input type="number" name="price" className="form-control w-100" value={price} onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                    </Col>
                </Row>
                <div className="form-group">
                    <label>Type:</label>
                    <select name="type" className="form-select w-25" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option defaultValue="">Select room type</option>
                        {Types(props.hotelType).map((type) => <option value={type} key={type}>{type}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image url:</label>
                    <input type="text" name="image" className="form-control w-75" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <small id="imageHelp" className="form-text text-muted">Optional image url for room.</small>
                </div>
                <div className="form-group">
                    <label>Polygon points:</label>
                    <input type="text" name="border" className="form-control w-75" placeholder="-" value={border} readOnly />
                </div>
                <button type="button" className="btn btn-dark" onClick={(e) => handleClick(e)}>Register</button>
            </form>
            <DrawCanvas initialData={points} onChange={onDraw} image={props.floorplan} />
            <div>
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
                        href={props.floorplan}
                    />
                    <polygon
                        points={border}
                        onClick={viewRoom}
                    />
                </svg>
            </div>
        </Layout>
    );
}

class RoomForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            hotelId: this.props.params.hotelId,
            hotelType: -1,
            floorId: this.props.params.floorId,
            floorplan: "",
            loaded: false,
        };
    }

    async getData() {
        const response = await fetch('api/floors/' + this.state.floorId);
        const floor = await response.json();
        const response_next = await fetch('api/hotels/' + this.state.hotelId);
        const hotel = await response_next.json();
        this.setState({ floorplan: floor.floorplan, hotelType: hotel.roomClassification, loaded: true });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <>
                {this.state.loaded &&
                    <RoomFormFunction
                        hotelId={this.state.hotelId}
                        hotelType={this.state.hotelType}
                        floorId={this.state.floorId}
                        floorplan={this.state.floorplan}
                    />}
            </>
        )
    };
}

export default withParams(RoomForm);