import express from "express";
import todoRouter from "./routers/todoRouter.js";

import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
// app.get("/", (req, res) => res.send("Hello world."));

// app.use("/", todoRouter);

import mqtt from "mqtt";

const options = {
	clientId:"datnq",
	username:"datnq",
	password:"datnq123",
	clean:true
};

const MQTT_IP_ADDRESS = process.env.MQTT_IP_ADDRESS;
let client = mqtt.connect(`${MQTT_IP_ADDRESS}`, options);

console.log("connected flag  " + client.connected);

client.on("connect", () => {	
	console.log("connected  " + client.connected);
});

client.on("connect", () => {
	client.subscribe("presence", (err) => {
		if (!err) {
			client.publish("presence", "Hello mqtt");
		}
	});
});

client.on("message", (topic, message) => {
  	// message is Buffer
	console.log(message.toString());
});

// DB connect using MySQL
// import connection from "./db/connection.js";
// connection.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected to DataBase!!!")
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`The app start on ${PORT}`));
