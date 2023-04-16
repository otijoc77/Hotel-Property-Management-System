import React, { Component } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';
import { HotelTable } from './HotelTable';

export class HotelList extends Component {
    render() {
        return (
            <Layout>
                <h1 id="tabelLabel" >Hotels</h1>
                <HotelTable/>
            </Layout>
        );
    }
}