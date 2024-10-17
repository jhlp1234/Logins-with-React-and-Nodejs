const mysql = require("mysql");
const info = require("./sqlInfo.json");
const connection = mysql.createConnection({
    host: "localhost",
    user: info.user,
    password: info.password,
    database: info.database
})

connection.connect();

module.exports = connection;