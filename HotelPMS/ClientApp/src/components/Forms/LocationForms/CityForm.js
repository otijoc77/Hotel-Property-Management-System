import React, { useState, useEffect } from 'react';
import '../../../custom.css';

export function CityForm(props) {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");

    async function handleClick(e) {
        e.preventDefault();
        window.location.reload(false);
        await fetch('api/cities', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                countryId: country,
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
        <div>
            <h1 id="header" >Register city</h1>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control w-75" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <select name="country" className="form-select w-50" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option defaultValue="">Select country</option>
                        {props.countries.map((country) => <option value={country.id} key={country.id}>{country.name}</option>)}
                    </select>
                </div>
                <button type="button" className="btn btn-dark" disabled={name == "" || props.countries == [] || country == ""} onClick={(e) => handleClick(e)}>Add</button>
            </form>
        </div>
    );
}