import React from 'react';
import BaseItem from '../components/BaseItem';
import './Dashboard.css';

import temperature_icon from "../assets/images/icons/temparature.png";	
import humidity_icon from "../assets/images/icons/humidity.png";
import luminosity_icon from "../assets/images/icons/brightness.png";
import GroupButton from '../components/GroupButton';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import MyChart from '../components/MyChart';

Chart.register(CategoryScale);

const Dashboard = () => {
  let temperature_value = Math.floor(Math.random() * 100);
	let humidity_value = Math.floor(Math.random() * 100);
	let luminosity_value = Math.floor(Math.random() * 200);

  return (
    <div className="container">
      <h2>SMART HOME - B20DCPT053 - Nguyen Quoc Dat</h2>

      <div className="first-row">
        <div className="first-row__items">
          <BaseItem className="temperature" 
            name={"Temperature"} 
            value={temperature_value} 
            icon={temperature_icon} 
            end={"°C"}
          />

          <BaseItem className="humidity" 
            name={"Humidity"} 
            value={humidity_value} 
            icon={humidity_icon}
            end={"%"}
          />

          <BaseItem className="luminosity" 
          name={"Luminosity"} 
          value={luminosity_value} 
          icon={luminosity_icon}
          end={"lux"}
          />
        </div>
      </div>

      <div className="second-row">
        <div className="main-graph">
        <MyChart />
        </div>


        <div className="list-btn">
          <GroupButton />
          <GroupButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
