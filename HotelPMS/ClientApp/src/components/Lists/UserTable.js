import React, { useState } from 'react';
import AccountLevels from '../../enums/AccountLevels';
import '../../custom.css';
import { useEffect } from 'react';
import ServiceTypes from '../../enums/ServiceTypes';
import { useAuth } from '../Functions/UserProvider';

export function UserTable(props) {
    const { cookies } = useAuth();

    const [companies, setCompanies] = useState([]);
    const [hotels, setHotels] = useState([]);
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
        if (props.user.account.level != "Client") {
            window.location.reload(false);
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
        else alert("Can't assign hotel to clients!");
    }

    async function updateUserHotelId(props) {
        props.e.preventDefault();
        if (props.user.account.level != "Client") {
            window.location.reload(false);
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
                    companyId: props.user.companyId,
                    hotelId: props.hotelId,
                })
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else alert("Can't assign hotel to clients!");
    }

    async function updateUserService(props) {
        props.e.preventDefault();
        if (props.user.account.level != "Client") {
            window.location.reload(false);
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
                    serviceType: props.serviceType,
                    accountId: props.user.accountId,
                    companyId: props.user.companyId,
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
        else alert("Can't assign hotel to clients!");
    }

    useEffect(() => {
        if (props.admin) {
            fetch('api/companies')
                .then(response => response.json())
                .then(data => {
                    setCompanies(data);
                    setLoaded(true);
                });
        }
        if (cookies.level == "Manager") {
            fetch('api/hotels/company' + cookies.company)
                .then(response => response.json())
                .then(data => {
                    setHotels(data);
                    setLoaded(true);
                });
        }
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
                        {cookies.level == "Manager" &&
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
                            {cookies.level == "Manager" && loaded &&
                                <>
                                    <td>
                                        <select name="type" className="form-select w-100" value={user.account.serviceType} onChange={(e) => updateUserService({ e, user: user, serviceType: e.target.value })} >
                                            {ServiceTypes.map(level =>
                                                <>
                                                    <option defaultValue={level.label == user.account.serviceType} value={level.label} key={level.value}>{level.label}</option>
                                                </>)}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="hotel" className="form-select w-100" value={user.hotelId} onChange={(e) => updateUserHotelId({ e, user: user, hotelId: e.target.value != '' ? e.target.value : null })} >
                                            <option defaultValue={user.hotelId == null} value={''} key={0}>No hotel</option>
                                            {hotels.map(hotel =>
                                                <>
                                                    <option defaultValue={hotel.id == user.hotelId} value={hotel.id} key={hotel.id}>{hotel.name}</option>
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