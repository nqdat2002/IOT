import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import formatDate from "./utils/formatDate.js";
import {CreateDataSensor} from "./controllers/dataSensor.js";

const options = {
	clientId: process.env.MQTT_CLIENT_ID,
	username: process.env.MQTT_USERNAME,
	password: process.env.MQTT_PASSWORD,
	clean: true
};
const MQTT_IP_ADDRESS = process.env.MQTT_PROTOCOL + "://" + process.env.MQTT_HOST + ":" + process.env.MQTT_PORT;

let topicValues = {
    "temperature": null,
	"humidity": null,
    "luminosity": null,
	"dateCreated": null,
};

let ledStatus = {
    "Led_1": "off",
    "Led_2": "off",
}

const updateLedStatus = (led, status) => {
    if (ledStatus[led] !== status) {
        ledStatus[led] = status;
        console.log("now LedStatus: ", ledStatus);
    }
};


const mqttClient = {
    client: null,
    connectMqtt: () => {
        mqttClient.client = mqtt.connect(`${MQTT_IP_ADDRESS}`, options);
        
        console.log("connected flag  " + mqttClient.client.connected);
        mqttClient.client.on("connect", () => {	
	        console.log("connected with " + mqttClient.client.connected);
        });
    },

    pubMqtt: (topic, message) => {
        if (mqttClient.client.connected) {
            console.log("connected  " + mqttClient.client.connected);
            mqttClient.client.publish(topic, message, (err) => {
                if(err){
                    console.log("Error: ", err);
                    return;
                }
                else console.log("Message is published");
                // client.end();
            });
        }
        mqttClient.client.on('error', (err) => {
            console.error('Error occurred:', err);
        });
    },

    subMqtt: (topic) => {
        mqttClient.client.on("connect", () => {
            console.log("connected  " + mqttClient.client.connected);
            mqttClient.client.subscribe(topic, (err) => {
                if (!err) {
                    console.log("Subscribed to topics: ", topic);
                    return;
                }
                console.log("Error: ", err);
            });
        });

        mqttClient.client.on('error', (err) => {
            console.error('Error occurred:', err);
        });
    },

    // message received from the broker
    msgMqtt: () => {
        mqttClient.client.on("message", (topic, message) => {
            if (topic == "esp32/datasensors"){
                try {
                    const now = formatDate(new Date());
                    const data = JSON.parse(message.toString());
                    topicValues["temperature"] = data.temperature;
                    topicValues["humidity"] = data.humidity;
                    topicValues["luminosity"] = data.luminosity;
                    topicValues["dateCreated"] = now;
                    console.log("Date Created: ", now);
                    console.log("Temperature: ", data.temperature);
                    console.log("Humidity: ", data.humidity);
                    console.log("Luminosity: ", data.luminosity);	
        
                    // save data to db
                    CreateDataSensor(topicValues);
                } 
                catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            }

            if (topic == "esp32/ledStatus"){
                try {
                    const now = formatDate(new Date());
                    const data = JSON.parse(message.toString());
                    console.log("Recieved Msg: ", data);
                    console.log("prev LedStatus: ", ledStatus);

                    for (const led in ledStatus) {
                        if (ledStatus.hasOwnProperty(led)) {
                            updateLedStatus(led, data[led].substring(3));
                        }
                    }
                    // save data to db
                    // CreateActionHistory(data);
                } 
                catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            }
        });
        mqttClient.client.on('error', (err) => {
            console.error('Error occurred:', err);
        });
    }

    ,
    msgwithCallBackMqtt: (callback) => {
        mqttClient.client.on("message", callback);

        mqttClient.client.on('error', (err) => {
            console.error('Error occurred:', err);
        });
    }
};

export default mqttClient;
mqttClient.connectMqtt();