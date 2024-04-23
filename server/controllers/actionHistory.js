import connection from "../db/connection.js";
import mqttClient from "../mqttClient.js";
import formatDate from "../utils/formatDate.js";
import compareObjects from "../utils/compareObject.js";
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

const handleRequestData = (data, res) => {
    return res.status(200).send({ message: data , status: "success"});
};

export async function changeAction(req, res, next) {
    try {
        const data = req.body;
        // console.log('data recieved from client: ', data);
        const changedDevice = data.change;
        delete data.change;
        console.log('data send from client after delete: ', data);
        // const message = { "Led_1": data.light, "Led_2": data.fan };
        // console.log('message send to mqtt client: ', JSON.stringify(message));
        mqttClient.pubMqtt("esp32/device_control", JSON.stringify(data));
        let responseSent = false;

        const mqttResponseHandler = (topic, message) => {
            if (!responseSent && topic == "esp32/device_status"){
                try {
                    const now = formatDate(new Date());
                    const recieve = JSON.parse(message.toString());
                    // console.log("Recieved Msg from esp32/device_status: ", recieve);
                    // replace `is` in the key to ``
                    let data2 = {
                        "light": null,
                        "fan": null
                    };
                    for (const key in recieve){
                        data2[key] = recieve[key].slice(3);
                    }
                    // console.log("Recieved Msg after replace: ", data2);

                    if (compareObjects(data, data2)){
                        const createData = {};
                        createData.device_id = changedDevice;
                        createData.action = data[changedDevice];
                        createData.date = now;
                        CreateActionHistory(createData);
                        // console.log(now);
                        responseSent = true;
                        return res.status(200).send({ message: data , status: "success"});
                    }
                } 
                catch (err) {
                    console.error('Error parsing JSON:', err);
                }
            }
        };
        mqttClient.msgwithCallBackMqtt(mqttResponseHandler, res);

    } catch (error) {
        console.error("Error in changeAction: ", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

export async function getFilterActionHistory(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const keyword = req.query.keyword || '';
        const sortBy = req.query.sortBy || '';
        const sortOrder = req.query.sortOrder || '';
        const type = req.query.type || 'all';
        let query = {};
        if (keyword) {
            query = {
                ...query,
                $or: [
                    { temperature: { $regex: keyword, $options: 'i' } }, 
                    { humidity: { $regex: keyword, $options: 'i' } } ,
                    { luminosity: { $regex: keyword, $options: 'i' } },
                    { dateCreated: { $regex: keyword, $options: 'i' } },

                ]
            };
        }

        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }

        // get all rows not contain limit & page
        const rows = await getFilter(page, limit, keyword, sortBy, sortOrder, type);
        const totalRows = rows.length;
        const totalPages = Math.ceil(totalRows / limit);
        // console.log("Total rows: ", totalRows);
        // console.log("Total Pages: ", totalPages);
        const currentPage = page > totalPages ? 1 : page;        
        // console.log("Current Page: ", currentPage);
        res.status(200).send({
            "total": totalRows,
            "totalPages": totalPages,
            "currentPage": currentPage,
            "rows": rows.slice((currentPage - 1) * limit, Math.min((currentPage - 1) * limit + limit, totalRows))
        });
    }
    catch (error) {
        console.error("Error in FilterDataSensor: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getFilter(page, limit, keyword, sortBy, sortOrder, type) {
    return new Promise((resolve, reject) => {
        let sql = '';
        if (type == 'all'){
            sql = `SELECT id, device_id, action, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM actionhistory`;
        }
        else sql = 'SELECT `id`, ' + '`' + type + '`, ' + `DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM actionhistory`;


        if (keyword) {
            if (type == 'all')
                sql += ` WHERE device_id LIKE '%${keyword}%' OR action LIKE '%${keyword}%' OR date LIKE '%${keyword}%'`;
            else sql += ` WHERE ${type} LIKE '%${keyword}%' OR date LIKE '%${keyword}%'`;
            }

        if (sortBy !== 'all') {
            sql += ` ORDER BY ${sortBy} ${sortOrder}`;
        }
        // pagination in mysql
        // const offset = (page - 1) * limit;
        // sql += ` LIMIT ${limit} OFFSET ${offset}`;
        // console.log("sql: ", sql);
        connection.query(sql, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// non async function
function CreateActionHistory(data){
    // console.log("Data to be inserted: ", data);
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