﻿import React, { useEffect, useState } from "react";
import "../../custom.css";
import { useAuth } from "../Functions/UserProvider";
import { Layout } from "../Layout";

export function CompanyForm() {
	const link_back = "/company-list";

	const { cookies } = useAuth();

	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [logo, setLogo] = useState("");
	const [description, setDescription] = useState("");

	async function handleClick(e) {
		e.preventDefault();
		window.location.href = link_back;
		await fetch("api/companies", {
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				code: code,
				name: name,
				logo: logo,
				description: description,
			}),
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		if (cookies.name == undefined) {
			window.location.href = "/login";
		}
		if (cookies.level != "Admin") {
			window.location.href = "/unauthorised";
		}
	}, []);

	return (
		<Layout>
			<div className="w-100 d-table">
				<h1 id="header" className="d-table-cell">
					Register company
				</h1>
				<div className="d-table-cell text-r">
					<button
						className="btn btn-dark"
						onClick={(e) => (window.location.href = link_back)}
					>
						Back
					</button>
				</div>
			</div>
			<form>
				<div className="form-group">
					<label>Code:</label>
					<input
						type="text"
						name="code"
						className="form-control w-50"
						placeholder="Code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						className="form-control w-50"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Company logo url:</label>
					<input
						type="text"
						name="logo"
						className="form-control w-75"
						placeholder="Logo"
						value={logo}
						onChange={(e) => setLogo(e.target.value)}
					/>
					<small id="logoHelp" className="form-text text-muted">
						Url for company logo.
					</small>
				</div>
				<div className="form-group">
					<label>Description:</label>
					<textarea
						name="description"
						className="form-control w-75"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<button
					type="button"
					className="btn btn-dark"
					disabled={name == "" || code == ""}
					onClick={(e) => handleClick(e)}
				>
					Register
				</button>
			</form>
		</Layout>
	);
}
