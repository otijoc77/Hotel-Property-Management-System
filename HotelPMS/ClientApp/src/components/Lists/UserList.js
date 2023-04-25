import React, { Component } from 'react';
import '../../custom.css';
import AccountLevels from '../../enums/AccountLevels';
import { Layout } from '../Layout';
import { UserTable } from './UserTable';

export class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentUserId: 0,
            loading: true
        };
    }

    async populateUserData() {
        const response = await fetch('api/users');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }

    async updateUserLevel(props) {
        props.e.preventDefault();
        window.location.reload(false);
        console.log(props);
        await fetch('api/users/' + this.state.currentUserId, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                account: {
                    level: props.level,
                },
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    componentDidMount() {
        this.populateUserData();
    }

    static renderUsersTable(users) {
        return (
            <UserTable users={users} admin={true}/>
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