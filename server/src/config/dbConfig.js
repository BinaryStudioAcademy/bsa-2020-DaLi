import dotenv from 'dotenv';

dotenv.config();

const db = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const { database, username, password, host, port } = db;
const databaseURL = `postgres:${username}:${password}@${host}:${port}/${database}`;

export default databaseURL;
