import React, { useState } from 'react';
import '../../custom.css';
import { Header } from '../Navigation/Header';

export function LoginForm() {
    async function handleClick(e) {
        e.preventDefault();
        window.location.href = '/';
        if (username != "" && password != "") {
            await fetch('api/users', {
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
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Header />
            <h1 id="header" className="text-center">Login</h1>
            <form className="center">
                <div className="form-group center">
                    <label className="d-block center w-50">Username:</label>
                    <input type="text" name="username" className="form-control w-50 center" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div class="form-group center">
                    <label className="d-block center w-50">Password:</label>
                    <input type="password" name="password" className="form-control w-50 center" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="button" className="btn btn-dark d-block center w-25 margin-b-5" onClick={(e) => handleClick(e)}>Login</button>
                <button type="button" className="btn btn-dark d-block center w-25">Forgot password?</button>
            </form>
        </div>
    );
}