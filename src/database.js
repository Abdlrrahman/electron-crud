const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successfully made.');
  })
  .catch(err => {
    console.error('Error connecting to database', err);
  });

function getConnection() {
  return sequelize;
}

module.exports = { getConnection };