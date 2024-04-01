import e from "express";
import connection from "../db/connection.js";

// async function
export async function getAllDataSensor(req, res, next) {
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
    
};

export async function getFilterDataSensor(req, res, next) {   
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
};

async function getFilter(page, limit, keyword, sortBy, sortOrder, type) {
    return new Promise((resolve, reject) => {
        let sql = '';
        if (type == 'all'){
            sql = `SELECT id, temperature, humidity, luminosity, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM datasensors`;
        }
        else sql = 'SELECT `id`, ' + '`' + type + '`, ' + `DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS dateCreated FROM datasensors`;


        if (keyword) {
            if (type == 'all')
                sql += ` WHERE temperature LIKE '%${keyword}%' OR humidity LIKE '%${keyword}%' OR luminosity LIKE '%${keyword}%' OR date LIKE '%${keyword}%'`;
            else sql += ` WHERE ${type} LIKE '%${keyword}%' OR date LIKE '%${keyword}%'`;
            }

        if (sortBy !== 'all') {
            sql += ` ORDER BY ${sortBy} ${sortOrder}`;
        }
        // pagination in mysql
        // const offset = (page - 1) * limit;
        // sql += ` LIMIT ${limit} OFFSET ${offset}`;
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
export function CreateDataSensor(data){
    var sql = `INSERT INTO datasensors (temperature, humidity, luminosity, date) VALUES ('${data.temperature}', '${data.humidity}', '${data.luminosity}', '${data.dateCreated}')`;
    // console.log(sql);
    connection.query(sql, function (err, result) {
        if (err){
            console.log("Error inserting record: ", err);
            return;
        }
        console.log("1 record inserted");
        console.log("Number of records inserted: " + result.affectedRows);
    }
)};