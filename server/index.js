import express from "express";
import todoRouter from "./routers/todoRouter.js";

const app = express();
app.use(express.json());

// app.get("/", (req, res) => res.send("Hello world."));

// app.use("/", todoRouter);

import mqtt from "mqtt";
let client = mqtt.connect("mqtt://test.mosquitto.org");

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
	client.end();
});
const PORT = 5000;

app.listen(PORT, () => console.log(`The app start on ${PORT}`));
