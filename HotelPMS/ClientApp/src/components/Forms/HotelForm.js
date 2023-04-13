import React, { useState, useEffect, Component } from 'react';
import { useParams } from "react-router-dom";
import '../../custom.css';
import HotelTypes from '../../enums/HotelTypes';
import RoomClassifications from '../../enums/RoomClassifications';
import { Layout } from '../Layout';

function HotelFormFunction(companyId) {
    const MAX_LATITUDE_LENGTH = 90;
    const MIN_LATITUDE_LENGTH = -90;
    const MAX_LONGITUDE_LENGTH = 180;
    const MIN_LONGITUDE_LENGTH = -180;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState("");
    const [rating, setRating] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [type, setType] = useState("");
    const [roomClassification, setClassification] = useState("");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch('api/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setLoaded(true);
            });
    }, []);

    async function handleClick() {
        const company = companyId.companyId;
        if (name != "" || address != "") {
            await fetch('api/hotels', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    image: image,
                    cityId: city,
                    rating: rating,
                    latitude: latitude,
                    longitude: longitude,
                    type: type,
                    roomClassification: roomClassification,
                    companyId: company,
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
            <h1 id="header" >Register hotel</h1>
            <form>
                <div className="form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" className="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label for="address">Address:</label>
                    <input type="text" name="address" className="form-control w-75" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label for="image">Image url:</label>
                    <input type="text" name="image" className="form-control w-75" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <small id="imageHelp" className="form-text text-muted">Optional image for hotel.</small>
                </div>
                <div className="form-group">
                    <label for="city">City:</label>
                    <select name="city" className="form-select w-50" value={city} onChange={(e) => setCity(e.target.value)} required>
                        <option defaultValue="">Select city</option>
                        {loaded && cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label for="rating">Rating:</label>
                    <select name="rating" className="form-select w-5" value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option defaultValue value="0">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="row w-50">
                    <div className="form-group col">
                        <label for="latitude">Latitude:</label>
                        <input type="number" name="latitude" className="form-control w-100" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
                        <small id="latitudeHelp" className="form-text text-muted">Range from -90 to 90.</small>
                    </div>
                    <div className="form-group col">
                        <label for="longitude">Longitude:</label>
                        <input type="number" name="longitude" className="form-control w-100" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
                        <small id="longitudeHelp" className="form-text text-muted">Range from -180 to 180.</small>
                    </div>
                </div>
                <div className="row w-50">
                    <div className="form-group col">
                        <label for="type">Type:</label>
                        <select name="type" className="form-select w-100" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option defaultValue="">Select hotel type</option>
                            {HotelTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}
                        </select>
                    </div>
                    <div className="form-group col">
                        <label for="roomClassification">Room Classification:</label>
                        <select name="roomClassification" className="form-select w-100" value={roomClassification} onChange={(e) => setClassification(e.target.value)} required>
                            <option defaultValue="">Select room classification type</option>
                            {RoomClassifications.map((classification) => <option value={classification.value} key={classification.value}>{classification.label}</option>)}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark" disabled={latitude < MIN_LATITUDE_LENGTH || latitude > MAX_LATITUDE_LENGTH || longitude < MIN_LONGITUDE_LENGTH || longitude > MAX_LONGITUDE_LENGTH || roomClassification == "" || type == "" || city == ""} onClick={handleClick}>Register</button>
            </form>
        </Layout>
    );
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class HotelForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { addModalShow: false, editModalShow: false, companyId: this.props.params.companyId };
    }

    render() {
        return (
            <HotelFormFunction companyId={this.state.companyId} />
        ) 
    };
}

export default withParams(HotelForm);