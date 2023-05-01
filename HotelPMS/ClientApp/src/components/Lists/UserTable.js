import React, { useState } from 'react';
import AccountLevels from '../../enums/AccountLevels';
import '../../custom.css';

export function UserTable(props) {
    const [currentUserId, setCurrentUserId] = useState(0);    

    async function updateUserLevel(props) {
        props.e.preventDefault();
        window.location.reload(false);
        console.log(props);
        await fetch('api/users/' + currentUserId, {
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

    return (
        <div className='card'>
            <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                <thead className='table-head'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        {props.admin && <th>Level</th>}
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user => user.account != null &&
                        <tr key={user.id}>
                            <td>{user.name} {user.surname}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            {props.admin &&
                                <td>
                                    <select name="level" className="form-select w-50" value={user.account.level} onChange={(e) => { setCurrentUserId(user.id); updateUserLevel(e, user.account.level) }} >
                                        {AccountLevels.map(level =>
                                            <>
                                                <option defaultValue={level.label == user.account.level} value={level.label} key={level.value}>{level.label}</option>
                                            </>)}
                                    </select>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}