require('dotenv').config();
const mysql = require('mysql2');

// mysql2 connection
const db = mysql.createConnection({
    host : process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DATABASE
});

module.exports = db;