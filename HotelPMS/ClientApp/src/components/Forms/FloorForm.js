import React, { useState, Component } from 'react';
import '../../custom.css';
import withParams from '../../hooks/withParameters';
import { Layout } from '../Layout';

function FloorFormFunction(hotelId) {
    const link_back = "/hotel/" + hotelId.hotelId + "/floorplan";
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
                    hotelId: hotelId.hotelId,
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
                    <div className="form-group">
                        <label>Number:</label>
                        <input type="number" name="number" className="form-control w-25" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Area (m<sup>2</sup>):</label>
                        <input type="number" name="area" className="form-control w-25" value={area} onChange={(e) => setArea(e.target.value)} />
                    </div>
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

class FloorForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { hotelId: this.props.params.hotelId };
    }

    render() {
        return (
            <FloorFormFunction hotelId={this.state.hotelId} />
        )
    };
}

export default withParams(FloorForm);