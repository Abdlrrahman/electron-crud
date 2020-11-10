const mysql = require('promise-mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

console.log(process.env.DB_HOST)

function getConnection() {
  return connection;
}

module.exports = { getConnection };