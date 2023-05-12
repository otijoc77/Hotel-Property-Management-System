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
                                <div className="card-header text-white bg-color">
                                    <h4><em>This is a hotel property management system created first and foremost to manage hotel reservations and requests.</em></h4>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <br />
                                    <li className="list-group-item"><p>Hotel employees can freely track the different types of requests that clients make via the interactive floorplans for each building.</p></li>
                                    <li className="list-group-item"><p>For just regular travelers that want to find a good place to stay, you can make reservations from this site too!</p></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    {/*<Row>
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
                    </Row>*/}
                </div>
            </Layout>
        );
    }
}
