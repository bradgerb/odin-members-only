#! /usr/bin/env node

require('dotenv').config();

const { Client } = require("pg");

const connection_string = process.env.connection_string;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255),
    password VARCHAR(255),
    ismember BOOLEAN,
    isadmin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
    message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message VARCHAR(255),
    date TIMESTAMPTZ DEFAULT now(),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
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