import connection from "../db/connection.js";

// async function
export async function getAllDataSensor(req, res, next) {
    try {
        const sql = "SELECT * FROM datasensors";
        console.log(sql);

        connection.query(sql, async (err, result, fields) => {
            if (err) {
                console.log("Error getting records: ", err);
                return res.status(500).json(err);
            }
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error in getAllDataSensor: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
};

// non async function
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