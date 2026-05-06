const { Pool } = require("pg");

const host = process.env.host;
const dbUsername = process.env.dbUsername;
const dbPassword = process.env.dbPassword;
const dbName = process.env.dbName;
const port = process.env.port;
const connectionString = process.env.connectionString;

module.exports = new Pool({
  host: `${host}`,
  user: `${dbUsername}`,
  database: `${dbName}`,
  password: `${dbPassword}`,
  port: `${port}`,
  connectionString: `${connectionString}`
});