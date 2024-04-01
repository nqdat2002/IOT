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

import { changeActionHistoryHandler, getAllDataSensorHandler } from '../api';
Chart.register(CategoryScale);

const Dashboard = () => {
	
	const [temperature_value, setTemperatureValue] = useState(0);
	const [humidity_value, setHumidityValue] = useState(0);
	const [luminosity_value, setLuminosityValue] = useState(0);
	const [dataSensor, setDataSensor] = useState([
		{
			"id": 18,
			"temperature": 20,
			"humidity": 72,
			"luminosity": 1872,
			"dateCreated": "2024-03-10 12:40:12"
		},
		{
			"id": 19,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1695,
			"dateCreated": "2024-03-10 12:41:10"
		},
		{
			"id": 20,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1871,
			"dateCreated": "2024-03-10 12:41:15"
		},
		{
			"id": 21,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1871,
			"dateCreated": "2024-03-10 12:41:20"
		},
		{
			"id": 22,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1863,
			"dateCreated": "2024-03-10 12:41:25"
		},
		{
			"id": 23,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1685,
			"dateCreated": "2024-03-10 12:41:30"
		},
		{
			"id": 24,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1867,
			"dateCreated": "2024-03-10 12:41:37"
		},
		{
			"id": 25,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1872,
			"dateCreated": "2024-03-10 12:41:40"
		},
		{
			"id": 26,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1867,
			"dateCreated": "2024-03-10 12:41:45"
		},
		{
			"id": 27,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1860,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 28,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1860,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 29,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1685,
			"dateCreated": "2024-03-10 12:42:01"
		},
		{
			"id": 30,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1869,
			"dateCreated": "2024-03-10 12:42:05"
		},
		{
			"id": 31,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1859,
			"dateCreated": "2024-03-10 12:42:12"
		},
		{
			"id": 32,
			"temperature": 20,
			"humidity": 71,
			"luminosity": 1861,
			"dateCreated": "2024-03-10 12:42:15"
		},
	]);
	useEffect(() => {
		const fetchDataSensor = async () => {
			const response = await getAllDataSensorHandler();
			if (response === undefined) {
				return;
			}
			const responseData = response.data[response.data.length - 1];
			if (responseData === undefined) {
				console.log("No data");
				return;
			}
			setDataSensor(prevData => {
				const newDataSensor = [...prevData];
				const newData = {
					temperature: responseData.temperature,
					humidity: responseData.humidity,
					luminosity: responseData.luminosity,
					dateCreated: responseData.dateCreated
				};
				newDataSensor.push(newData);
				newDataSensor.shift();
				setTemperatureValue(newData.temperature);
				setHumidityValue(newData.humidity);
				setLuminosityValue(newData.luminosity);
				return newDataSensor;
			});
		}

		const intervalId = setInterval(() => {
			fetchDataSensor();
		}, 5000);

		return () => clearInterval(intervalId);
	}, [dataSensor]);


	const [lightButtonLabel, setLightButtonLabel] = useState("OFF");
	const [fanButtonLabel, setFanButtonLabel] = useState("OFF");

	const handleToggleLight = () => {
		const newlightButtonLabel = lightButtonLabel === "ON" ? "OFF" : "ON";
		changeActionHistoryHandler({ "light": newlightButtonLabel.toLocaleLowerCase(), "fan": fanButtonLabel.toLocaleLowerCase(), "change": "light"}).then((response) => {
			// console.log(response.message);
			setLightButtonLabel(response.message.light === "on" ? "ON" : "OFF");
		}).catch((err) => {
			console.error("Error in changeActionHistoryHandler: ", err);
		});
		console.log(`Light button is clicked to change ${newlightButtonLabel}`);
	};

	const handleToggleFan = () => {
		const newfanButtonLabel = fanButtonLabel === "ON" ? "OFF" : "ON";
		changeActionHistoryHandler({ "light": lightButtonLabel.toLocaleLowerCase(), "fan": newfanButtonLabel.toLocaleLowerCase(), "change": "fan"}).then((response) => {
			// console.log(response.message);
			setFanButtonLabel(response.message.fan === "on" ? "ON" : "OFF");
		}).catch((err) => {
			console.error("Error in changeActionHistoryHandler: ", err);
		});
		console.log(`Light button is clicked to change ${newfanButtonLabel}`);
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
					<MyChart data={dataSensor}/>
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
