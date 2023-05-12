import React, { useState } from 'react';
import AccountLevels from '../../enums/AccountLevels';
import '../../custom.css';
import { useEffect } from 'react';

export function UserTable(props) {
    const [companies, setCompanies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    async function updateUserLevel(props) {
        props.e.preventDefault();
        window.location.reload(false);
        console.log(props);
        await fetch('api/accounts/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: props.account.id,
                username: props.account.username,
                password: props.account.password,
                level: props.level,
                created: props.account.created,
                temporary: props.account.temporary,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    async function updateUserCompanyId(props) {
        props.e.preventDefault();
        window.location.reload(false);
        console.log(props);
        console.log(JSON.stringify({
            id: props.user.id,
            name: props.user.name,
            surname: props.user.surname,
            gender: props.user.gender,
            email: props.user.email,
            phoneNumber: props.user.phoneNumber,
            serviceType: props.user.serviceType,
            accountId: props.user.accountId,
            companyId: props.companyId,
            hotelId: props.companyId,
        }));
        await fetch('api/users/', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                id: props.user.id,
                name: props.user.name,
                surname: props.user.surname,
                gender: props.user.gender,
                email: props.user.email,
                phoneNumber: props.user.phoneNumber,
                serviceType: props.user.serviceType,
                accountId: props.user.accountId,
                companyId: props.companyId,
                hotelId: props.user.hotelId,
            })
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            });
    }

    useEffect(() => {
        fetch('api/companies')
            .then(response => response.json())
            .then(data => {
                setCompanies(data);
                setLoaded(true);
            });
    }, []);

    return (
        <div className='card'>
            <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                <thead className='table-head'>
                    <tr>
                        <th>Name</th>
                        {props.users[0].account &&
                            <th>Username</th>
                        }
                        <th>Email</th>
                        <th>Phone Number</th>
                        {props.admin &&
                            <>
                                <th>Level</th>
                                <th>Company</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name} {user.surname}</td>
                            {user.account &&
                                <td>{user.account.username}</td>
                            }
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            {props.admin && loaded &&
                                <>
                                    <td>
                                        <select name="level" className="form-select w-100" value={user.account.level} onChange={(e) => updateUserLevel({ e, account: user.account, level: e.target.value })} >
                                            {AccountLevels.map(level =>
                                                <>
                                                    <option defaultValue={level.label == user.account.level} value={level.label} key={level.value}>{level.label}</option>
                                                </>)}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="company" className="form-select w-100" value={user.companyId} onChange={(e) => updateUserCompanyId({ e, user: user, companyId: e.target.value != '' ? e.target.value : null })} >
                                            <option defaultValue={user.companyId == null} value={''} key={0}>No company</option>
                                            {companies.map(company =>
                                                <>
                                                    <option defaultValue={company.id == user.companyId} value={company.id} key={company.id}>{company.name}</option>
                                                </>)}
                                        </select>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}