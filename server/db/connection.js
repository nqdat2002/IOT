import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'datnq123',
    database: 'iot_app'
});

export default connection;