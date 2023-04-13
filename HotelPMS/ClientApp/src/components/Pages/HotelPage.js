import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { Col, Row, Container } from 'reactstrap';
import { HotelTable } from '../Lists/HotelTable';
import '../../custom.css';
import { Layout } from '../Layout';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class HotelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel: { id: 0, name: "", address: "", image: "", cityId: 0, rating: 0, type: 0, roomClassification: 0 },
            id: this.props.params.id,
            link_floorplan: '/hotel/' + this.props.params.id + '/floorplan',
            link_floor: '/hotel/' + this.props.params.id + '/floor-register'
        };
    }

    refreshList() {
        fetch('api/hotels/' + this.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ hotel: data });
                console.log(data)
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    deleteClick() {
        /*await fetch('api/companies', {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                code: code,
                name: name,
                description: description,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })*/
    }

    render() {
        return (
            <Layout>
                <Container>
                    <Row>
                        <h1 id="name" >{this.state.hotel.name}</h1>
                        {/*rating here*/}
                    </Row>
                    {/*picture here*/}
                    <Row>
                        <p>{this.state.hotel.address}</p>
                    </Row>
                    <Row>
                        <p>{this.state.hotel.type}</p>
                        <p>{this.state.hotel.roomClassification}</p>
                    </Row>
                    <Row>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = this.state.link_floorplan} >Edit</button>
                        <button className="btn btn-danger btn-red w-100p margin-2" onClick={this.deleteClick()} >Delete</button>
                    </Row>
                    <button className="btn btn-dark w-200p margin-b-5" onClick={e => window.location.href = this.state.link_floor} >Register new hotel</button>
                </Container>
            </Layout>
        )
    };
}

export default withParams(HotelPage);