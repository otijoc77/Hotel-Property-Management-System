import React, { useState } from "react";
import "../../custom.css";
import { Layout } from "../Layout";
import { UserTable } from "./UserTable";
import { useAuth } from "../Functions/UserProvider";
import { useEffect } from "react";

export function UserList() {
	const { cookies } = useAuth();

	const [state, setState] = useState({
		users: [],
		loading: true,
	});

	async function populateUserData() {
		const response = await fetch("api/users");
		const data = await response.json();
		setState({ users: data, loading: false });
	}

	useEffect(() => {
		if (cookies.name == undefined) {
			window.location.href = "/login";
		}
		/*if (cookies.level != "Admin") {
            window.location.href = '/unauthorised';
        }*/
		populateUserData();
	}, []);

	function renderUsersTable(users) {
		return <UserTable users={users} admin={true} />;
	}

	let contents = state.loading ? (
		<p>
			<em>Loading...</em>
		</p>
	) : state.users.length == 0 ? (
		<p>
			<em>No registered users.</em>
		</p>
	) : (
		renderUsersTable(state.users)
	);

	return (
		<Layout>
			<h1 id="tabelLabel">Users</h1>
			<div className="w-100 d-table">
				<p className="d-table-cell">Registered users:</p>
			</div>
			{contents}
		</Layout>
	);
}
