import { createContext, useContext, useMemo, useState } from "react";
import { useCookies } from "react-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [cookies, setCookies, removeCookie] = useCookies();

	const login = async ({ username, password }) => {
		const res = await fetch("api/login", {
			method: "POST",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.log(error);
			});

		if (res.account != null) {
			setCookies("token", null);
			setCookies("name", res.account.username);
			setCookies("level", res.account.level);
			setCookies("user", res.userId);
			setCookies("hotel", res.hotelId);
			setCookies("company", res.companyId);
			window.location.href = "/";
		} else {
			alert("Login failed!");
		}
	};

	const logout = () => {
		["token", "name", "level", "user", "hotel"].forEach((obj) =>
			removeCookie(obj)
		);
		window.location.href = "/";
	};

	const value = useMemo(
		() => ({
			cookies,
			login,
			logout,
		}),
		[cookies]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
	return useContext(UserContext);
};
