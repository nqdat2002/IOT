import React from 'react';
import { useState, useEffect } from 'react';

import temperature_icon from "../assets/images/icons/temparature.png";
import humidity_icon from "../assets/images/icons/humidity.png";
import luminosity_icon from "../assets/images/icons/brightness.png";
import light_off_icon from "../assets/images/icons/light-off.png";
import light_on_icon from "../assets/images/icons/light-on.png";
import fan_icon from "../assets/images/icons/fan.png";


import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import MyChart from '../components/MyChart';

import DataBox from '../components/DataBox';
import ActionButton from '../components/ActionButton';

import { rawDataSensor } from '../utils/constant';
import '../styles/dashboard.css';

import { changeActionHistoryHandler, getLastestDataSensorHandler } from '../api';
Chart.register(CategoryScale);

const Dashboard = () => {

	const [temperature_value, setTemperatureValue] = useState(0);
	const [humidity_value, setHumidityValue] = useState(0);
	const [luminosity_value, setLuminosityValue] = useState(0);
	const [dataSensor, setDataSensor] = useState(rawDataSensor);
	useEffect(() => {
		const fetchDataSensor = async () => {
			const response = await getLastestDataSensorHandler();
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
		changeActionHistoryHandler({ "light": newlightButtonLabel.toLocaleLowerCase(), "fan": fanButtonLabel.toLocaleLowerCase(), "change": "light" })
			.then((response) => {
				console.log(response.message.light);
				const lightStatus = response.message.light;
				setLightButtonLabel(lightStatus === "on" ? "ON" : "OFF");
			})
			.catch((err) => {
				console.error("Error in changeActionHistoryHandler: ", err);
			});
		console.log(`Light button is clicked to change ${newlightButtonLabel}`);
	};


	const handleToggleFan = () => {
		const newfanButtonLabel = fanButtonLabel === "ON" ? "OFF" : "ON";
		changeActionHistoryHandler({ "light": lightButtonLabel.toLocaleLowerCase(), "fan": newfanButtonLabel.toLocaleLowerCase(), "change": "fan" })
			.then((response) => {
				console.log(response.message.fan);
				setFanButtonLabel(response.message.fan === "on" ? "ON" : "OFF");
			}).catch((err) => {
				console.error("Error in changeActionHistoryHandler: ", err);
			});
		console.log(`Fan button is clicked to change ${newfanButtonLabel}`);
	};

	return (
		<div className="container">
			<h2>SMART HOME - B20DCPT053 - Nguyen Quoc Dat</h2>

			<div className="first-row">
				<div className="first-row__items">
					<DataBox
						index={0}
						name={"Temperature"}
						value={temperature_value}
						icon={temperature_icon}
						end={"°C"}
					/>

					<DataBox
						index={1}
						name={"Humidity"}
						value={humidity_value}
						icon={humidity_icon}
						end={"%"}
					/>

					<DataBox
						index={2}
						name={"Luminosity"}
						value={luminosity_value}
						icon={luminosity_icon}
						end={"lux"}
					/>

					{/* <BaseItem
						index={2}
						name={"Luminosity"}
						value={luminosity_value}
						icon={luminosity_icon}
						end={"lux"}
					/> */}

				</div>
			</div>

			<div className="second-row">
				<div className="main-graph" >
					<MyChart data={dataSensor} />
				</div>
				<div className="list-btn">
					<ActionButton
						value={lightButtonLabel}
						icon={lightButtonLabel === "OFF" ? light_off_icon : light_on_icon}
						onClick={handleToggleLight}
						isActive={false}
					/>
					<ActionButton
						value={fanButtonLabel}
						icon={fanButtonLabel === "OFF" ? fan_icon : fan_icon}
						onClick={handleToggleFan}
						isActive={fanButtonLabel === "ON" ? true : false}
					/>

					{/* <ActionButton
						value={fanButtonLabel}
						icon={fanButtonLabel === "OFF" ? fan_icon : fan_icon}
						onClick={handleToggleFan}
						isActive={fanButtonLabel === "ON" ? true : false}
					/> */}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
