import React, { useState } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';

export function FloorForm() {
    const [number, setNumber] = useState(0);
    const [area, setArea] = useState(0);

    return (
        <Layout>
            <h1 id="header" >Register floor</h1>
            <form>
                <div class="row w-50">
                    <div class="form-group">
                        <label for="number">Number:</label>
                        <input type="number" name="number" class="form-control w-50" placeholder="Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    </div>
                    <div class="form-group">
                        <label for="area">Area:</label>
                        <input type="number" name="area" class="form-control w-50" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
                    </div>
                    <div>
                    </div>
                </div>
                <button type="submit" class="btn btn-dark" onClick={handleClick}>Register</button>
            </form>
        </Layout>
    );
}