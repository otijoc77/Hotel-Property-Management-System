import React, { useState } from 'react';
import '../../custom.css';
import { useAuth } from '../Functions/UserProvider';
import { Header } from '../Navigation/Header';

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    async function handleClick(e) {
        e.preventDefault();
        if (username != "" && password != "") {
            login({ username, password });
        }
    }

    return (
        <div>
            <Header />
            <h1 id="header" className="text-center">Login</h1>
            <form className="center">
                <div className="form-group center">
                    <label className="d-block center w-50">Username:</label>
                    <input type="text" name="username" className="form-control w-50 center" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group center">
                    <label className="d-block center w-50">Password:</label>
                    <input type="password" name="password" className="form-control w-50 center" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="button" className="btn btn-dark d-block center w-25 margin-b-5" onClick={(e) => handleClick(e)}>Login</button>
            </form>
        </div>
    );
}