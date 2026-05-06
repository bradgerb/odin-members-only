#! /usr/bin/env node

require('dotenv').config();

const { Client } = require("pg");

const connection_string = process.env.connection_string;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255)
);
`

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connection_string,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();