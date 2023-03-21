import React, { useState } from 'react';
import '../../custom.css';

export function CompanyForm() {
    async function handleClick() {
        await fetch('api/companies', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
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

    const [code, setCode] = useState("");
    const [name, setName] = useState("");

    return (
        <div>
            <h1 id="tabelLabel" >Register company</h1>
            <form>
                <div class="form-group">
                    <label for="code">Code:</label>
                    <input type="text" name="code" class="form-control w-50" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <br />
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" class="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <br />
                <button type="submit" class="btn btn-dark" onClick={handleClick}>Register</button>
            </form>
        </div>
    );
}