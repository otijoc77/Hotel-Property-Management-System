import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { Col, Row, Container } from 'reactstrap';
import { HotelTable } from '../Lists/HotelTable';
import '../../custom.css';
import { Layout } from '../Layout';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: { id: 0, code: "", name: "", description: "", hotels: [] },
            id: this.props.params.id,
            loaded: false,
            link_back: '/company-list',
            link_hotel: '/company/' + this.props.params.id + '/hotel-register',
            link_company: '/company/' + this.props.params.id + '/edit'
        };
    }

    async refreshList() {
        await fetch('api/companies/' + this.state.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ company: data, loaded: true });
                console.log(data)
            })
    }

    async deleteClick() {
        window.location.href = this.state.link_back;
        await fetch('api/companies/' + this.state.id, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        return (
            <Layout>
                <h1 id="name" >{this.state.company.name}</h1>
                <Container>
                    <Row>
                        <svg xmlns="http://www.w3.org/2000/svg" width={100} height={100}>
                            <g fill="#61DAFB">
                                <circle cx="50" cy="50" r="50" />
                            </g>
                        </svg>
                        <p>{this.state.company.description}</p>
                    </Row>
                    <Row>
                        <button className="btn btn-dark w-100p margin-2" onClick={e => window.location.href = this.state.link_company} >Edit</button>
                        <button className="btn btn-danger btn-red w-100p margin-2" onClick={e => this.deleteClick()} >Delete</button>
                    </Row>
                    <Row>
                        <button className="btn btn-dark w-200p margin-b-5 margin-2" onClick={e => window.location.href = this.state.link_hotel} >Register new hotel</button>
                    </Row>
                    {this.state.loaded && <HotelTable companyHotels={this.state.company.hotels}/>}
                </Container>
            </Layout>
        )
    };
}

export default withParams(CompanyPage);