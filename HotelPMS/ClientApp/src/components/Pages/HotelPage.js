import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { Col, Row, Container } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { ReviewTable } from '../Lists/ReviewTable';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class HotelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: { id: 0, name: "", address: "", image: "", cityId: 0, rating: 0, type: 0, roomClassification: 0, reviews: [] },
            loaded: false,
            id: this.props.params.id,
            link_edit: '/hotel/' + this.props.params.id + '/edit',
            link_floorplan: '/hotel/' + this.props.params.id + '/floorplan'
        };
    }

    getHotel() {
        fetch('api/hotels/' + this.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ hotel: data, loaded: true });
                console.log(data)
            })
    }

    componentDidMount() {
        this.getHotel();
    }

    deleteClick() {
        fetch('api/hotels/' + this.state.id, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <Layout>
                <Container>
                    <Row>
                        <h1 id="name" >{this.state.hotel.name}</h1>
                        {/*rating here*/}
                    </Row>
                    <Row>
                        <Col>
                            <div className='card p-3'>
                                <Row>
                                    <label>Address:</label>
                                    <p className="bold">{this.state.hotel.address}</p>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>Type:</label>
                                        <p className="bold">{this.state.hotel.type}</p>
                                    </Col>
                                    <Col>
                                        <label>Room classification:</label>
                                        <p className="bold">{this.state.hotel.roomClassification}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = this.state.link_edit} >Edit</button>
                                    <button className="btn btn-danger btn-red w-100p margin-2" onClick={e => this.deleteClick()} >Delete</button>
                                </Row>
                                <Row>
                                    <button className="btn btn-dark w-200p margin-b-5 margin-2" onClick={e => window.location.href = this.state.link_floorplan} >Floorplan</button>
                                </Row>
                            </div>
                        </Col>
                        <Col>
                            <div className='card'>
                                {this.state.hotel.image != "" && <img src={this.state.hotel.image} className="img-fluid" alt="Hotel" />}
                            </div>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <ReviewTable hotelReviews={this.state.hotel.reviews} />
                    </Row>
                </Container>
            </Layout>
        )
    };
}

export default withParams(HotelPage);