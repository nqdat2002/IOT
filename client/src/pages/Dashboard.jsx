import React from 'react';
import { useState, useEffect } from 'react';

import BaseItem from '../components/BaseItem';

import temperature_icon from "../assets/images/icons/temparature.png";
import humidity_icon from "../assets/images/icons/humidity.png";
import luminosity_icon from "../assets/images/icons/brightness.png";
import light_off_icon from "../assets/images/icons/light-off.png";
import light_on_icon from "../assets/images/icons/light-on.png";
import fan_icon from "../assets/images/icons/fan.png";

import GroupButton from '../components/GroupButton';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import MyChart from '../components/MyChart';
import './Dashboard.css';
Chart.register(CategoryScale);

const Dashboard = () => {
	const [temperature_value, setTemperatureValue] = useState(Math.floor(Math.random() * 100));
	const [humidity_value, setHumidityValue] = useState(Math.floor(Math.random() * 100));
	const [luminosity_value, setLuminosityValue] = useState(Math.floor(Math.random() * 4000));


	useEffect(() => {
		const interval = setInterval(() => {
			setTemperatureValue(Math.floor(Math.random() * 100));
			setHumidityValue(Math.floor(Math.random() * 100));
			setLuminosityValue(Math.floor(Math.random() * 4000));
		}, 1000);
		return () => clearInterval(interval);
	}, []); 


	const [lightButtonLabel, setLightButtonLabel] = useState("OFF");
	const [fanButtonLabel, setFanButtonLabel] = useState("OFF");

	const handleToggleLight = () => {
		setLightButtonLabel((prevLabel) => (prevLabel === "ON" ? "OFF" : "ON"));
	};

	const handleToggleFan = () => {
		setFanButtonLabel((prevLabel) => (prevLabel === "ON" ? "OFF" : "ON"));
	};

	return (
		<div className="container">
			<h2>SMART HOME - B20DCPT053 - Nguyen Quoc Dat</h2>

			<div className="first-row">
				<div className="first-row__items">
					<BaseItem
						index={0}
						name={"Temperature"}
						value={temperature_value}
						icon={temperature_icon}
						end={"°C"}
					/>

					<BaseItem
						index={1}
						name={"Humidity"}
						value={humidity_value}
						icon={humidity_icon}
						end={"%"}
					/>

					<BaseItem
						index={2}
						name={"Luminosity"}
						value={luminosity_value}
						icon={luminosity_icon}
						end={"lux"}
					/>
				</div>
			</div>

			<div className="second-row">
				<div className="main-graph" >
					<MyChart temperature_value={temperature_value} humidity_value={humidity_value} luminosity_value={luminosity_value}/>
				</div>
				<div className="list-btn">
					<GroupButton 
						value={lightButtonLabel} 
						icon={lightButtonLabel === "OFF" ? light_off_icon : light_on_icon} 
						onClick={handleToggleLight}  
						isActive={false}
					/>
					<GroupButton
						value={fanButtonLabel}
						icon={fanButtonLabel === "OFF" ? fan_icon : fan_icon}
						onClick={handleToggleFan}
						isActive={fanButtonLabel === "ON" ? true : false}
					/>				
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
