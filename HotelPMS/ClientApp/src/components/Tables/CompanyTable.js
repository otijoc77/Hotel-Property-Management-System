import React, { Component } from 'react';
import '../../custom.css';

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

    static renderCompaniesTable(companies) {
        return (
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th>Id</th>
                            <th>Code</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company =>
                            <tr key={company.Id}>
                                <td>{company.id}</td>
                                <td>{company.code}</td>
                                <td>{company.name}</td>
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
            <div>
                <h1 id="tabelLabel" >Companies</h1>
                <p>Registered companies:</p>
                {contents}
            </div>
        );
    }
}