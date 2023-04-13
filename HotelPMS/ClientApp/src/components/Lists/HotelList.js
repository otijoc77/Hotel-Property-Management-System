import React, { Component } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';

export class CompanyTable extends Component {
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
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company =>
                            <tr key={company.id} onClick={() => this.handleRowClick(company.Id)}>
                                <td>{company.logo}</td>
                                <td><a href={"/company/" + company.id} >{company.name}</a></td>
                                <td>{company.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.companies.length == 0
                ? <p><em>No registered companies.</em></p>
                : CompanyTable.renderCompaniesTable(this.state.companies);

        return (
            <Layout>
                <h1 id="tabelLabel" >Companies</h1>
                <div className="w-100 d-table">
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