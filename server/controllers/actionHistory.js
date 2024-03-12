import e from "express";
import connection from "../db/connection.js";

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
            return res.status(200).json(result);
        });
    } catch (error) {
        console.error("Error in getAllActionHistory: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export async function changeActionHisrory(req, res, next) {
    const action = req.body.action; 
    res.json({ status: 'success', action });
}

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