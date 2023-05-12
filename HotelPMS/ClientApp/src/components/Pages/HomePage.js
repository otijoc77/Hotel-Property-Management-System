import React, { Component } from 'react';
import { Layout } from '../Layout';
import { Col, Row } from 'reactstrap';
import hotelPic from './hotel.jpg';

export class HomePage extends Component {
    static displayName = HomePage.name;

    render() {
        return (
            <Layout>
                <div className="w-100">
                    <h1>Welcome to Holtley!</h1>
                    <Row>
                        <Col>
                            <img src={hotelPic} className="img-fluid rounded w-100 margin-b-5 border border-dark" alt="Hotel" />
                        </Col>
                        <Col className="px-5">
                            <div className="card p-3 h-100">
                                <p>This is a hotel property management system created first and foremost to manage hotel reservations and requests.</p>
                                <p>For just regular travelers that want to find a good place to stay, you can make reservations from this site too!</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <h3>What we offer:</h3>
                    </Row>
                    <Row>
                        <Col>
                            <div className="card p-3 h-100">
                            </div>
                        </Col>
                        <Col>
                            <div className="card p-3 h-100">
                            </div>
                        </Col>
                        <Col>
                            <div className="card p-3 h-100">
                            </div>
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}
