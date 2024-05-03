import React from 'react';
import {NavLink } from 'react-router-dom';
import "../styles/navbar.css";

const NavBar = () => {
	return (
		<header>
			<ul>
				<li>
					<NavLink to="/">Dashboard</NavLink>
				</li>
				<li>
					<NavLink to="/datasensors">Data Sensors</NavLink>
				</li>
				<li>
					<NavLink to="/actionhistory">Action History</NavLink>
				</li>
				<li>
					<NavLink to="/profile">Profile</NavLink>
				</li>
			</ul>
		</header>
	);
};


export default NavBar;