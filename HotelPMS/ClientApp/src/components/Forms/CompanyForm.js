import React, { useState } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';

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
                description: description,
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
    const [description, setDescription] = useState("");

    return (
        <Layout>
            <h1 id="header" >Register company</h1>
            <form>
                <div className="form-group">
                    <label for="code">Code:</label>
                    <input type="text" name="code" className="form-control w-50" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label for="name">Name:</label>
                    <input type="text" name="name" className="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label for="description">Description:</label>
                    <textarea name="description" className="form-control w-75" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-dark" disabled={name == "" || code == ""} onClick={handleClick}>Register</button>
            </form>
        </Layout>
    );
}