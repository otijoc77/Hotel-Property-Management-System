import React, { useState, useEffect } from 'react';
import '../../../custom.css';

export function CityForm() {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const [loaded, setLoaded] = useState(false);

    async function handleClick() {
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
            })
    }

    useEffect(() => {
        fetch('api/countries')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setLoaded(true);
            });
    }, []);

    return (
        <div>
            <h1 id="header" >Register city</h1>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <select name="country" className="form-select w-50" value={country} onChange={(e) => setCountry(e.target.value)}>
                        <option defaultValue="">Select country</option>
                        {loaded && countries.map((country) => <option value={country.id} key={country.id}>{country.name}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-dark" disabled={name == "" || countries == [] || country == ""} onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}