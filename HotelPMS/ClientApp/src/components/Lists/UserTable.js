import React from 'react';
import AccountLevels from '../../enums/AccountLevels';
import '../../custom.css';

export function UserTable(props) {
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
                                    <select name="level" className="form-select w-50" value={user.account.level} onChange={(e) => { this.setState({ currentUserId: user.id }); this.updateUserLevel(e, user.account.level) }} >
                                        {AccountLevels.map(level => <option value={level.value} key={level.value}>{level.label}</option>)}
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