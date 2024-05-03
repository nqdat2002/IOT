# Overview
The Internet of Things (IoT) refers to the network of interconnected devices, sensors, and other physical objects embedded with software, sensors, and network connectivity, enabling them to collect and exchange data over the internet. IoT technology allows for the seamless integration of the physical and digital worlds, enabling automation, data-driven decision-making, and improved efficiency across various industries and applications.
# Key Components
## 1. Devices and Sensors:
   Devices: These are physical objects embedded with sensors, actuators, and network connectivity to collect and transmit data.
   Sensors: Sensors detect changes in the physical environment (e.g., temperature, humidity, motion) and convert them into electrical signals.
## 2. Connectivity:
   Internet Connectivity: IoT devices connect to the internet via various communication protocols such as Wi-Fi, Bluetooth, Zigbee, or cellular networks.
   Local Connectivity: Some IoT ecosystems utilize local communication protocols like Bluetooth Low Energy (BLE) or Zigbee for device-to-device communication within a limited range.
## 3. Data Processing and Analytics:
   Edge Computing: Processing data closer to the source (at the edge) to reduce latency and bandwidth usage.
   Cloud Computing: Storing and processing large volumes of IoT data in the cloud for advanced analytics, machine learning, and long-term storage.
## 4. Applications and Services:
   Monitoring and Control: Real-time monitoring and remote control of devices and systems.
   Predictive Maintenance: Using data analytics to predict equipment failures and schedule maintenance proactively.
   Smart Cities: Implementing IoT solutions for traffic management, waste management, energy efficiency, and public safety.
   Healthcare: Remote patient monitoring, wearable health devices, and telemedicine applications.
   Industrial IoT (IIoT): Optimizing industrial processes, supply chain management, and asset tracking in manufacturing and logistics.
## 5. Security and Privacy:
   Data Encryption: Protecting IoT data from unauthorized access by encrypting data during transmission and storage.
   Access Control: Implementing user authentication and authorization mechanisms to control access to IoT devices and data.
   Device Management: Ensuring the security of IoT devices through secure boot, over-the-air (OTA) updates, and vulnerability management.

# Getting Started
## 1. Frontend
   Develop the user interface for your IoT application using React.js.
   ### init
   ```
   npx create-react-app <your-app>
   ```
   ### start
   ```
   npm start
   ```

   Create components to visualize data, control devices, and interact with the user.
   ### library: react-chartjs-2, chart.js, axios, ...
   Use libraries like Axios or Fetch to make HTTP requests to your Express.js backend.
   ```
      const response = await axios.post(url, {object});
      const response = await axios.get(url);
   ```
   Click here <a href="https://legacy.reactjs.org/docs/create-a-new-react-app.html" target="_blank"> to know more about ReactJS!

## 2. Backend
   Implement RESTful APIs using Express.js to handle client requests from the React.js frontend.
   ### start:
   ```
      npm install express
   ```
   ```
      const express = require('express'); 
      const app = express(); 
      app.get('/', function (req, res) {
         res.send('Hello World');
      })
      
      app.get('/', (req, res) => {   
          res.send('Hello World!') 
      });

      const port = 3000;  

      app.listen(port, () => {   
          console.log(`Example app listening on port ${port}!`) 
      });
   
   ```
   Define routes for CRUD operations (Create, Read, Update, Delete) to interact with the MySQL database.
   Set up routes for MQTT messages to communicate with IoT devices via the MQTT broker.
   Use middleware for authentication, request validation, and error handling. (this will be improved later)
## 3. Database
   Design and create a MySQL database schema to store data related to your IoT application (e.g., device information, sensor readings, user data).
   Use SQL queries to perform database operations such as inserting, updating, deleting, and querying data.
   Establish a connection to the MySQL database from your Express.js backend using a MySQL client library (e.g., mysql2).
   ### Connect:
   ```
   const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'datnq123',
        database: 'iot_app'
   });
   ```
   ### Create Table:
   ```
   create table datasensor{
       id int auto_increment primary key,
       temperature float,
       humidity float,
       luminosity float,
       created_at timestamp default current_timestamp
   };
   ```
   ### Query:
   ```
   try {
        const sql = "SELECT id, temperature, humidity, luminosity, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM datasensors";
        // console.log(sql);

        connection.query(sql, async (err, result, fields) => {
            if (err) {
                console.log("Error getting records: ", err);
                return res.status(500).json(err);
            }
            return res.status(200).send({data: result, message: 'success'});
        });
    } catch (error) {
        console.error("Error in getAllDataSensor: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
   ```
## 4. MQTT Broker
   ### Download and Install
   <a href="https://mosquitto.org/download/" target="_blank">Install MQTT</a> an MQTT broker (e.g., Mosquitto, RabbitMQ) to facilitate communication between IoT devices and your backend.

   <a href="https://mqtt-explorer.com/" target="_blank">MQTT Explorer</a> if you need to test connection of MQTT.
   
   <a href="https://www.youtube.com/watch?v=hyJhKWhxAxA" target="_blank">Tutorial</a> Set up & Config MQTT.

   <a href="https://www.arduino.cc/en/software" target="_blank">Install Arduino Ide</a> to type your code.

   ### Connect Wifi
   ```
   const char* ssid = "your ssid";
   const char* password = "<password>";
   const char* mqtt_server = "<your ip address>";
   
   const char* mqtt_user = "<your mqtt username>";
   const char* mqtt_password = "<your mqtt password>";


   WiFiClient espClient;
   PubSubClient client(espClient);

   ```
   
   ### Read Data
   Implement MQTT client functionality in your IoT devices to publish sensor data or subscribe to control commands.
   
   ```
   DHT dht(DHTPIN, DHTTYPE);
   float temperature = dht.readTemperature();   
   float humidity = dht.readHumidity();
   int luminosity = analogRead(Photoresistor);
   ```
   
   <a href="https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/" target="_blank">Read Data From DHT</a>

   ### Publish & Subscribe Topics
   
   Configure topics and subscriptions to route MQTT messages to the appropriate endpoints in your Express.js backend.
   ```
   client.subscribe("<Your Subcribe Topics>");

   client.publish("<Your Publish Topics>", data);
   ```
   
   Click <a href="https://randomnerdtutorials.com/esp32-mqtt-publish-subscribe-arduino-ide/" target="_blank">MQTT PUB/SUB</a> to know more!
   
   ### Library need to install in Arduino: PubSubClient, DHT sensor library, ArduinoJson, Adafruit Unified Sensor
   
   ### MQTT with NodeJs
   Import the MQTT.js client library

   ```
   const mqtt = require('mqtt')
   ```
   To establish the MQTT connection, it is necessary to set the connection address, port, and client ID. In this example, we utilize the built-in function that generates random numbers in JavaScript to generate    the client ID.
   ```
   const protocol = 'mqtt'
   const host = 'broker.emqx.io'
   const port = '1883'
   const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
   
   const connectUrl = `${protocol}://${host}:${port}`
   ```
   
   Next, we establish the connection using the URL constructed by splicing the host and port. To achieve this, we call the built-in connect function of the MQTT module, and once the connection is established,      it returns a Client instance.
   ```
   const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: 'emqx',
        password: 'public',
        reconnectPeriod: 1000,
   });
      
   client.on('connect', () => {
     console.log('Connected')
   });
   ```

   Publish & Subcribe Topic
   ```
   client.on('connect', () => {
     console.log('Connected')
   
     client.subscribe([topic], () => {
       console.log(`Subscribe to topic '${topic}'`)
       client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
         if (error) {
           console.error(error)
         }
       })
     })
   });
   ```

   You can learn more at <a href="https://www.emqx.com/en/blog/how-to-use-mqtt-in-nodejs" target="_blank">here</a>!
   
## 5. API Docs
   <a href="https://documenter.getpostman.com/view/27014654/2sA35HWLBy" target="_blank">API documentation<a>!

## 6. Preview UI System
   ### DashBoard
   ![Alt text](https://github.com/nqdat2002/IOT/blob/master/ui/203.jpg)

   ### DataSensors
   ![Alt text](https://github.com/nqdat2002/IOT/blob/master/ui/204.jpg)

   ### ActionHistory
   ![Alt text](https://github.com/nqdat2002/IOT/blob/master/ui/205.jpg)

   ### Profile
   ![Alt text](https://github.com/nqdat2002/IOT/blob/master/ui/206.jpg)


# Contributing
Contributions to this README are welcome! If you have suggestions, corrections, or additional information related to IoT technologies, feel free to submit a pull request.

# License
This README file is licensed under the Creative Commons Attribution 4.0 International License. You are free to share and adapt it for your own purposes, provided you give appropriate credit to the original author.
