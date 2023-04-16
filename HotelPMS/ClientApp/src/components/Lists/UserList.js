import React, { Component } from 'react';
import '../../custom.css';
import AccountLevels from '../../enums/AccountLevels';
import { Layout } from '../Layout';

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }

    async populateUserData() {
        const response = await fetch('api/users');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }

    componentDidMount() {
        this.populateUserData();
    }

    static renderUsersTable(users) {
        return (
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <tr key={user.id} onClick={() => this.handleRowClick(user.Id)}>
                                <td>{user.name} {user.surname}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <select name="floor" className="form-select w-50" value={this.state.currentFloorIndex} onChange={(e) => { this.setState({ currentFloorIndex: e.target.value, currentFloorId: this.state.floors[e.target.value].id }) }}>
                                        {AccountLevels.map(level => <option value={level.value} key={level.value}>{level.label}</option>)}
                                    </select>
                                </td>
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
            : this.state.users.length == 0
                ? <p><em>No registered users.</em></p>
                : UserList.renderUsersTable(this.state.users);

        return (
            <Layout>
                <h1 id="tabelLabel" >Users</h1>
                <div className="w-100 d-table">
                    <p className="d-table-cell">Registered users:</p>
                </div>
                {contents}
            </Layout>
        );
    }
}