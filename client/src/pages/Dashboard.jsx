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

import { changeActionHistoryHandler } from '../api';
Chart.register(CategoryScale);

const Dashboard = () => {
	const [temperature_value, setTemperatureValue] = useState(0);
	const [humidity_value, setHumidityValue] = useState(0);
	const [luminosity_value, setLuminosityValue] = useState(0);


	useEffect(() => {
		const interval = setInterval(() => {
			setTemperatureValue(0);
			setHumidityValue(0);
			setLuminosityValue(0);
		}, 1000);
		return () => clearInterval(interval);
	}, []); 


	const [lightButtonLabel, setLightButtonLabel] = useState("OFF");
	const [fanButtonLabel, setFanButtonLabel] = useState("OFF");

	const handleToggleLight = () => {
		const newlightButtonLabel = lightButtonLabel === "ON" ? "OFF" : "ON";
		changeActionHistoryHandler({"light": newlightButtonLabel.toLocaleLowerCase(), "fan": fanButtonLabel.toLocaleLowerCase()});
		setLightButtonLabel(newlightButtonLabel);
		console.log("Light button is clicked");
	};

	const handleToggleFan = () => {
		const newfanButtonLabel = fanButtonLabel === "ON" ? "OFF" : "ON";
		changeActionHistoryHandler({"light": lightButtonLabel.toLocaleLowerCase(), "fan": newfanButtonLabel.toLocaleLowerCase()});
		setFanButtonLabel(newfanButtonLabel);
		console.log("Fan button is clicked");
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
					<MyChart/>
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
