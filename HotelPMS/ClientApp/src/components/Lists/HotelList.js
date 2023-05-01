import React, { useState } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';
import { HotelTable } from './HotelTable';

export function HotelList() {
    const [search, setSearch] = useState("");
    const [hotels, setHotels] = useState(null);
    const [rerender, setRerender] = useState(false);

    async function handleClick(e) {
        if (search != "") {
            const response = await fetch('api/hotels/city/' + search);
            const data = await response.json();
            setHotels(data);
            setRerender(!rerender);
        }
    }

    return (
        <Layout>
            <h1 id="tabelLabel" >Hotels</h1>
            <form className="w-75 d-table margin-b-5">
                <input type="text" name="search" className="form-control d-table-cell margin-2" placeholder="City" value={search} onChange={(e) => setSearch(e.target.value)} required/>
                <div className="d-table-cell">
                    <button type="button" className="btn btn-dark" onClick={(e) => handleClick(e)}>Search</button>
                </div>
            </form>
            <HotelTable
                passedHotels={hotels}
                key={rerender}
            />
        </Layout>
    );
}