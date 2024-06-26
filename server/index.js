import express from "express";
import dataSensor from "./routers/dataSensor.js";
import actionHistory from "./routers/actionHistory.js";

import dotenv from "dotenv";
import cors from "cors";
import mqttClient from "./mqttClient.js";

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
app.use("/api/actionhistory", actionHistory);

const topics_sub = ["esp32/datasensors", "esp32/device_status"];
const topics_pub = ["esp32/device_control"];

mqttClient.client.setMaxListeners(20);
mqttClient.subMqtt(topics_sub);
mqttClient.msgMqtt();

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