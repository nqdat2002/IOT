import React from 'react';
import {NavLink } from 'react-router-dom';
import "./Navbar.css";
export const NavBar = () => {
	return (
		<header>
			<ul>
				<li>
					<NavLink to="/">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/datasensor">Data Sensors</NavLink>
				</li>
				<li>
					<NavLink to="/history">History</NavLink>
				</li>
				<li>
					<NavLink to="/profile">Profile</NavLink>
				</li>
			</ul>
		</header>
	);
};
