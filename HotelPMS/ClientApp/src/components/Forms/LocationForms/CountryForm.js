import React, { useState } from 'react';
import '../../../custom.css';

export function CountryForm() {
    async function handleClick() {
        await fetch('api/countries', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

    const [name, setName] = useState("");

    return (
        <div>
            <h1 id="header" >Register country</h1>
            <form>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-dark" disabled={name == ""} onClick={handleClick}>Add</button>
            </form>
        </div>
    );
}