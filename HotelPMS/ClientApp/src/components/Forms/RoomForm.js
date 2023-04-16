import React, { useState, Component } from 'react';
import { useParams } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import '../../custom.css';
import DrawCanvas from '../Functions/DrawCanvas';
import { Layout } from '../Layout';

function RoomFormFunction(props) {
    const link_back = "/hotel/" + props.hotelId + "/floorplan";
    const pattern = /\b\d[\d,.]*\b/mg;
    const [number, setNumber] = useState(0);
    const [area, setArea] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [border, setBorder] = useState("");
    const [points, setPoint] = useState();

    async function handleClick() {
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

    return (
        <Layout>
            <Row>
                <Col>
                    <h1 id="header" >Register room</h1>
                </Col>
                <Col>
                    <button className="btn btn-dark margin-2" onClick={e => window.location.href = link_back} >Back</button>
                </Col>
            </Row>
            <form>
                <Row className="w-75">
                    <Col>
                        <div className="form-group">
                            <label>Number:</label>
                            <input type="number" name="number" className="form-control w-100" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Area (m<sup>2</sup>):</label>
                            <input type="number" name="area" className="form-control w-100" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>Type:</label>
                            <select name="type" className="form-select w-100" value={type} onChange={(e) => setType(e.target.value)} required>
                                <option defaultValue="">Select room type</option>
                                {/*{loaded && cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)}*/}
                            </select>
                        </div>
                    </Col>
                </Row>
                <div className="form-group">
                    <label>Image url:</label>
                    <input type="text" name="image" className="form-control w-75" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <small id="imageHelp" className="form-text text-muted">Optional image url for room.</small>
                </div>
                <div className="form-group">
                    <label>Polygon points:</label>
                    <input type="text" name="border" className="form-control w-75" placeholder="-" value={border} readOnly />
                </div>
                <button type="submit" className="btn btn-dark" onClick={handleClick}>Register</button>
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
                    />
                </svg>
            </div>
        </Layout>
    );
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
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
                {this.state.loaded && < RoomFormFunction hotelId={this.state.hotelId} floorId = { this.state.floorId } floorplan={this.state.floorplan} />}
            </>
        )
    };
}

export default withParams(RoomForm);