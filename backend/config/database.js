require("dotenv").config();
const Sequelize = require("sequelize");

const db_system = process.env.db_system;
const db_host = process.env.db_host;
const db_name = process.env.db_name;
const db_login = process.env.db_login;
const db_password = process.env.db_password;

const sequelize = new Sequelize(db_name, db_login, db_password, {
  dialect: db_system,
  host: db_host,
});

module.exports = sequelize;
