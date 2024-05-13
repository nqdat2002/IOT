import React from 'react';
import { useState, useEffect } from 'react';

import temperature_icon from "../assets/images/icons/temparature.png";
import humidity_icon from "../assets/images/icons/humidity.png";
import luminosity_icon from "../assets/images/icons/brightness.png";
// import dusting_icon from "../assets/images/icons/dust.png"
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
	// const [dusting_value, setDustingValue] = useState(0);
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
				// adding 
				// setDustingValue(Math.floor(Math.random() * 10));
				return newDataSensor;
			});
		}

		const intervalId = setInterval(() => {
			fetchDataSensor();
		}, 5000);

		return () => clearInterval(intervalId);
	}, [dataSensor]);

	const [lightState, setLightState] = useState(false);
	const [fanState, setFanState] = useState(false);

	// useEffect(() => {
	// 	console.log(lightState, fanState);
	// }, [lightState, fanState]);

	const handleToggle = async (deviceName) => {
		let curdeviceLabel = {
			"light": lightState ? "on" : "off",
			"fan": fanState ? "on" : "off"
		};
		if (deviceName === "light") {
			curdeviceLabel[deviceName] = lightState ? "off" : "on";
		}
		if (deviceName === "fan") {
			curdeviceLabel[deviceName] = fanState ? "off" : "on";
		}
		const response = await changeActionHistoryHandler({
			"light": curdeviceLabel['light'],
			"fan": curdeviceLabel['fan'],
			"change": deviceName
		});

		const responseMessage = response.message;
		// console.log(responseMessage[deviceName]);
		if (deviceName === "light") {
			if (responseMessage[deviceName] === "on") {

				setLightState(true);
			}
			else
				setLightState(false);
		}
		if (deviceName === "fan") {
			if (responseMessage[deviceName] === "on") {
				setFanState(true);
			}
			else
				setFanState(false);
		}
		// console.log(lightState, fanState);
		console.log(curdeviceLabel);
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

					{/* <DataBox
						index={3}
						name={"Dusting"}
						value={dusting_value}
						icon={dusting_icon}
						end={"µg/m³"}
					/> */}

				</div>
			</div>

			<div className="second-row">
				<div className="main-graph" >
					<MyChart data={dataSensor} />
				</div>
				<div className="list-btn">
					<ActionButton
						value={lightState === false ? "OFF" : "ON"}
						icon={lightState === false ? light_off_icon : light_on_icon}
						onClick={() => handleToggle('light')}
						isActive={false}
					/>
					<ActionButton
						value={fanState === false ? "OFF" : "ON"}
						icon={fanState ? fan_icon : fan_icon}
						onClick={() => handleToggle('fan')}
						isActive={fanState}
					/>

					
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
