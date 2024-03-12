import express from "express";
import todoRouter from "./routers/todoRouter.js";
import dataSensor from "./routers/dataSensor.js";
import {CreateDataSensor} from "./controllers/dataSensor.js";

import dotenv from "dotenv";
// import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
// app.use(bodyParser.json());

app.use(
    cors(
    {
        origin : ["http://localhost:3000"],
        credentials: true, 
    })
);

// api home
app.get("/", (req, res) => res.send("Hello world."));

// app.use("/", todoRouter);
app.use("/api/datasensor", dataSensor);

import mqtt from "mqtt";
import formatDate from "./utils/formatDate.js";

const options = {
	clientId: process.env.MQTT_CLIENT_ID,
	username: process.env.MQTT_USERNAME,
	password: process.env.MQTT_PASSWORD,
	clean: true
};

const MQTT_IP_ADDRESS = process.env.MQTT_PROTOCOL + "://" + process.env.MQTT_HOST + ":" + process.env.MQTT_PORT;
let client = mqtt.connect(`${MQTT_IP_ADDRESS}`, options);

let topicValues = {
    "temperature": null,
	"humidity": null,
    "luminosity": null,
	"date": null,
}


const topics_sub = ["esp32/datasensors", "esp32/temperature", "esp32/humidity", "esp32/luminosity"];
const topics_pub = ["esp32/led/LED_02", "esp32/led/LED_04", "esp32/led/LED_All", "esp32/led/LED_status"];

// connect the client to the broker
console.log("connected flag  " + client.connected);

client.on("connect", () => {	
	console.log("connected  " + client.connected);
});

client.on("connect", () => {
	client.subscribe(topics_sub, (err) => {
		if (!err) {
			// client.publish("presence", "Hello mqtt");
			console.log("Subscribed to topics: ", topics_sub);
		}
	});
});
client.on("message", (topic, message) => {
	if (topic == "esp32/datasensors"){
		try {
			const now = formatDate(new Date());
			const data = JSON.parse(message.toString());
			topicValues["temperature"] = data.temperature;
			topicValues["humidity"] = data.humidity;
			topicValues["luminosity"] = data.luminosity;
			topicValues["date"] = now;
			console.log("Date Created: ", now);
			console.log("Temperature: ", data.temperature);
			console.log("Humidity: ", data.humidity);
			console.log("Luminosity: ", data.luminosity);	

			// save data to db
			CreateDataSensor(topicValues);
		} 
		catch (error) {
			console.error('Error parsing JSON:', error);
		}
	}
});


const PORT = process.env.PORT || 8080;

// DB connect using MySQL
import connection from "./db/connection.js";
connection.connect((err) => {
	if (err){
		console.log("Error connecting to DataBase!!!", err);
		return;
	}
	console.log("Connected to DataBase!!!");
	app.listen(PORT, () => console.log(`The app start on ${PORT}`));
});