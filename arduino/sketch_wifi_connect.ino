#include <DHT.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <ArduinoJson.h>
#include <Arduino.h>

#define LED_2 2  // what digital pin the Led_2 is connected
#define LED_4 4  // what digital pin the Led_4 is connected

#define DHTPIN 15     // what digital pin the DHT sensor is connected to
#define DHTTYPE DHT11   // there are multiple kinds of DHT sensors

#define Photoresistor 34
#define Port 1889

const char* ssid = "Active 3_2185";
const char* password = "datnq321";
const char* mqtt_server = "192.168.43.251";

const char* mqtt_user = "datnq";
const char* mqtt_password = "datnq123";

DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0; 
char msg[50];

void setup() {
  
  Serial.begin(115200);
  Serial.println("DHT11 test!");

  setup_wifi();
  client.setServer(mqtt_server, Port);
  client.setCallback(callback);
  pinMode(LED_2, OUTPUT);
  pinMode(LED_4, OUTPUT);
  pinMode(Photoresistor, INPUT);
  dht.begin();
}


void setup_wifi() {
  delay(4000);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  // Feel free to add more if statements to control more GPIOs with MQTT

  // If a message is received on the topic esp32/output, you check if the message is either "on" or "off". 
  // Changes the output state according to the message
  // if (String(topic) == "esp32/led/LED_02") {
  //   Serial.print("Changing output/LED_02 to ");
  //   if(messageTemp == "on"){
  //     Serial.println("on");
  //     digitalWrite(LED_2, HIGH);
  //   }
  //   else if(messageTemp == "off"){
  //     Serial.println("off");
  //     digitalWrite(LED_2, LOW);
  //   }
  // }

  // if (String(topic) == "esp32/led/LED_04"){
  //   Serial.print("Changing output/LED_04 to ");
  //   if(messageTemp == "on"){
  //     Serial.println("on");
  //     digitalWrite(LED_4, HIGH);
  //   }
  //   else if(messageTemp == "off"){
  //     Serial.println("off");
  //     digitalWrite(LED_4, LOW);
  //   }
  // }

  // if (String(topic) == "esp32/led/LED_All"){
  //   Serial.print("Changing output/LED_All to ");
  //   if(messageTemp == "on"){
  //     Serial.println("on");
  //     digitalWrite(LED_4, HIGH);
  //     digitalWrite(LED_2, HIGH);

  //   }
  //   else if(messageTemp == "off"){
  //     Serial.println("off");
  //     digitalWrite(LED_4, LOW);
  //     digitalWrite(LED_2, LOW);

  //   }
  // }

  if (String(topic) == "esp32/device_control"){
    StaticJsonDocument <500> json;
    DeserializationError err = deserializeJson(json, messageTemp);
    if (err){
      Serial.println(err.c_str());
      return;
    }

    String led_1 = json["light"];
    String led_2 = json["fan"];
    if (led_1 == "on" && led_2 == "on"){
      digitalWrite(LED_2, HIGH);
      digitalWrite(LED_4, HIGH);
      StaticJsonDocument <500> jsonStatus;
      jsonStatus["light"] = "is on";
      jsonStatus["fan"] = "is off";
      String results = "";
      serializeJson(jsonStatus, results);
      client.publish("esp32/device_status", results.c_str());
    }
    else if (led_1 == "off" && led_2 == "on"){
      digitalWrite(LED_2, LOW);
      digitalWrite(LED_4, HIGH);

      StaticJsonDocument <500> jsonStatus;
      jsonStatus["light"] = "is off";
      jsonStatus["fan"] = "is on";
      String results = "";
      serializeJson(jsonStatus, results);
      client.publish("esp32/device_status", results.c_str());
    }
    else if(led_1 == "on" && led_2 == "off"){
      digitalWrite(LED_2, HIGH);
      digitalWrite(LED_4, LOW);

      StaticJsonDocument <500> jsonStatus;
      jsonStatus["light"] = "is on";
      jsonStatus["fan"] = "is off";
      String results = "";
      serializeJson(jsonStatus, results);
      client.publish("esp32/device_status", results.c_str());
    }
    else {
      digitalWrite(LED_2, LOW);
      digitalWrite(LED_4, LOW);

      StaticJsonDocument <500> jsonStatus;
      jsonStatus["light"] = "is off";
      jsonStatus["fan"] = "is off";
      String results = "";
      serializeJson(jsonStatus, results);
      client.publish("esp32/device_status", results.c_str());
    }
  }
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
      // Subscribe
      // client.subscribe("esp32/led/LED_02");
      // client.subscribe("esp32/led/LED_04");
      // client.subscribe("esp32/led/LED_All");
      client.subscribe("esp32/device_control");

    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 5000) {
    lastMsg = now;
    
    // Temperature in Celsius
    float temperature = dht.readTemperature();   
    float humidity = dht.readHumidity();
    int luminosity = analogRead(Photoresistor);

    if (isnan(temperature) || isnan(humidity)){
      Serial.println("Failed to read from DHT sensor!");
      return;
    }

    // Convert the value to a char array

    char tempString[8];
    dtostrf(temperature, 1, 2, tempString);
    Serial.print("Temperature: ");
    Serial.println(tempString);
    // client.publish("esp32/temperature", tempString);

    char humString[8];
    dtostrf(humidity, 1, 2, humString);
    Serial.print("Humidity: ");
    Serial.println(humString);
    // client.publish("esp32/humidity", humString);

    char lumString[8];
    dtostrf(luminosity, 1, 2, lumString);
    Serial.print("Luminosity: ");
    Serial.println(lumString);
    // client.publish("esp32/luminosity", lumString);

    // String all = String(temperature) + " | " + String(humidity) + " | " + String(luminosity);
    // client.publish("esp32/all", all.c_str());

    StaticJsonDocument<250> doc;
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    doc["luminosity"] = luminosity;
    String all = "";
    serializeJson(doc, all);
    client.publish("esp32/datasensors", all.c_str());
  }
}
