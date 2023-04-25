import React, { Component } from 'react';
import '../../custom.css';
import { Col, Row } from 'reactstrap';
import { Layout } from '../Layout';

export class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = { companies: [], loading: true };
    }

    async populateCompanyData() {
        const response = await fetch('api/companies');
        const data = await response.json();
        this.setState({ companies: data, loading: false });
    }

    componentDidMount() {
        this.populateCompanyData();
    }

    handleOnClick() {
        window.location.href = '/company-register';
    }

    handleRowClick() {
        window.location.href = '/company/:id';
    }

    static renderCompaniesTable(companies) {
        return (
            <div>
                {companies.map(company =>
                    <div className="card p-2 margin-b-20" key={company.id} onClick={() => this.handleRowClick(company.Id)}>
                        <Row>
                            <Col>
                                {company.logo}
                            </Col>
                            <Col>
                                <h2><a href={"/company/" + company.id} >{company.name}</a></h2>
                            </Col>
                            <Col>
                                <p>{company.description}</p>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.companies.length == 0
                ? <p><em>No registered companies.</em></p>
                : CompanyList.renderCompaniesTable(this.state.companies);

        return (
            <Layout>
                <h1 id="tabelLabel" >Companies</h1>
                <div className="w-100 d-table margin-b-5">
                    <p className="d-table-cell">Registered companies:</p>
                    <div className="d-table-cell text-r">
                        <button className="btn btn-dark" onClick={this.handleOnClick}>Register new company</button>
                    </div>
                </div>
                {contents}
            </Layout>
        );
    }
}