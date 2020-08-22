import dotenv from 'dotenv';

dotenv.config();

const db = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
};

const { database, username, password, host, port, dialect } = db;

const config = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    operatorsAliases: '0',
  },
  test: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    operatorsAliases: '0',
  },
  production: {
    username,
    password,
    database,
    host,
    port,
    dialect,
    operatorsAliases: '0',
  },
};
module.exports = config;
