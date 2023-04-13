import React, { Component } from 'react';
import { Layout } from '../Layout';
import hotelPic from './hotel.jpg';

export class HomePage extends Component {
    static displayName = HomePage.name;

    render() {
        return (
            <Layout>
                <h1>Welcome to Holtley!</h1>
                <img src={hotelPic} className="img-fluid w-75 h-50 margin-b-5" alt="Hotel" />
                <p>This is a hotel property management system created first and foremost to manage hotel reservations and requests.</p>
                <p>For just regular travelers that want to find a good place to stay, you can make reservations from this site too!.</p>
            </Layout>
        );
    }
}
