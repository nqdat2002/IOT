import express from "express";
import todoRouter from "./routers/todoRouter.js";

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

let client = mqtt.connect("mqtt://192.188.12.111", options);
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

import connection from "./db/connection.js";
connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected to DataBase!!!")
});


const PORT = 5000;

app.listen(PORT, () => console.log(`The app start on ${PORT}`));
