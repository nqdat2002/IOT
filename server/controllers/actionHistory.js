import connection from "../db/connection.js";
import mqttClient from "../mqttClient.js";
import formatDate from "../utils/formatDate.js";
//async function 
export async function getAllActionHistory(req, res, next) {
    try {
        const sql = "SELECT id, device_id, action, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM actionhistory";
        // console.log(sql);

        connection.query(sql, async (err, result, fields) => {
            if (err) {
                console.log("Error getting records: ", err);
                return res.status(500).json(err);
            }
            return res.status(200).send({data: result, message : "success"});
        });
    } catch (error) {
        console.error("Error in getAllActionHistory: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export async function changeAction(req, res, next) {
    try {
        const data = req.body;
        console.log('data send from client: ', data);
        
        const message = { "Led_1": data.light, "Led_2": data.fan };

        // console.log('message send to mqtt client: ', JSON.stringify(message));
        mqttClient.pubMqtt("esp32/led", JSON.stringify(message));
        mqttClient.msgwithCallBackMqtt(mqttResponseHandler);

        const mqttResponseHandler = (topic, message) => {
            if (topic == "esp32/ledStatus"){
                try {
                    const now = formatDate(new Date());
                    const recieve = JSON.parse(message.toString());
                    console.log("Recieved Msg: ", recieve);

                    // save data to db
                    // CreateActionHistory(recieve);
                    res.status(200).send({ message: recieve });
                } 
                catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            }
        };
    } catch (error) {
        console.error("Error in changeAction: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// non async function
function CreateActionHistory(data){
    
    var sql = `INSERT INTO actionhistory (device_id, action, date) VALUES ('${data.device_id}', '${data.action}', '${data.date}')`;
    // console.log(sql)
    
    connection.query(sql, function (err, result) {
        if (err){
            console.log("Error inserting record: ", err);
            return;
        }
        console.log("1 record inserted");
        console.log("Number of records inserted: " + result.affectedRows);
    }
)};