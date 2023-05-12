import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { useAuth } from '../Functions/UserProvider';
import { useParams } from 'react-router-dom';

export default function FloorForm() {
    const { hotelId } = useParams();
    const { cookies } = useAuth();

    const link_back = "/hotel/" + hotelId + "/floorplan";
    const [number, setNumber] = useState(0);
    const [area, setArea] = useState(0);
    const [image, setImage] = useState("");

    async function handleClick(e) {
        e.preventDefault();
        window.location.href = link_back;
        if (number != 0 || image != "") {
            await fetch('api/floors', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    number: number,
                    area: area,
                    floorplan: image,
                    hotelId: hotelId,
                })
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    useEffect(() => {
        if (cookies.name == undefined) {
            window.location.href = '/login';
        }
        if (cookies.level != "Admin") {
            window.location.href = '/unauthorised';
        }
    }, []);

    return (
        <Layout>
            <div className="w-100 d-table">
                <h1 id="header" className="d-table-cell">Register floor</h1>
                <div className="d-table-cell text-r">
                    <button className="btn btn-dark margin-2" onClick={e => window.location.href = link_back} >Back</button>
                </div>
            </div>
            <form>
                <div className="row w-100">
                    <Row className="w-50">
                        <Col>
                            <div className="form-group">
                                <label>Number:</label>
                                <input type="number" name="number" className="form-control w-100" value={number} onChange={(e) => setNumber(e.target.value)} required />
                            </div>
                        </Col>
                        <Col>
                            <div className="form-group">
                                <label>Area (m<sup>2</sup>):</label>
                                <input type="number" name="area" className="form-control w-100" value={area} onChange={(e) => setArea(e.target.value)} />
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <label>Image url:</label>
                        <input type="text" name="image" className="form-control w-75" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} required />
                        <small id="imageHelp" className="form-text text-muted">Floorplan image url.</small>
                    </div>
                </div>
                <button type="button" className="btn btn-dark" onClick={(e) => handleClick(e)}>Register</button>
            </form>
        </Layout>
    );
}