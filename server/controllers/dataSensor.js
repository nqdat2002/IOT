import connection from "../db/connection";

export async function getAllDataSensor() {
    
};

export function CreateDataSensor(connector, data){
    var sql = `INSERT INTO datasensors (temperature, humidity, luminosity, date) VALUES ('${data.temperature}', '${data.humidity}', '${data.luminosity}', '${data.date}')`;
    
    connector.query(sql, function (err, result) {
        if (err){
            console.log("Error inserting record: ", err);
            return;
        }
        console.log("1 record inserted");
        console.log("Number of records inserted: " + result.affectedRows);
    }
)};