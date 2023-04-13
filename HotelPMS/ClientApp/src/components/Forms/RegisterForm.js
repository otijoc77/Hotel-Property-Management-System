﻿import React, { useState } from 'react';
import '../../custom.css';
import { Header } from '../Navigation/Header';

export function RegisterForm() {
    async function handleClick() {
        var accountId = 0;
        if (name != "" && surname != "" && (email != "" || number != "" || username != "" && password != "")) {
            await fetch('api/accounts', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
                .then(response => {
                    console.log(response);
                    response.json()
                        .then(data => {
                            accountId = data.id
                        })
                })
                .catch(error => {
                    console.log(error)
                });
            await fetch('api/users', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    gender: gender,
                    email: email,
                    phoneNumber: number,
                    accountId: accountId,
                })
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
        };
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [number, setPhoneNum] = useState("");

    return (
        <>
            <Header />
            <div className="center">
                <h1 id="header" >Register</h1>
                <form>
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input type="text" name="username" className="form-control w-50" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" name="password" className="form-control w-50" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="name">Name:</label>
                        <input type="text" name="name" className="form-control w-50" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="surname">Surname:</label>
                        <input type="text" name="surname" className="form-control w-50" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label for="gender">Gender:</label>
                        <select name="gender" className="form-select w-25" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option defaultValue value="3">-</option>
                            <option value="0">woman</option>
                            <option value="1">man</option>
                            <option value="2">nonbinary</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="email" name="email" className="form-control w-50" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="number">Phone number:</label>
                        <input type="text" name="number" className="form-control w-50" placeholder="Phone number" value={number} onChange={(e) => setPhoneNum(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={handleClick}>Register</button>
                </form>
            </div>
        </>
    );
}