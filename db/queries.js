const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1", [username]
  );
  return rows
}

async function getUserByID(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE id = $1", [id]
  );
  return rows
}

async function newUser(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, password]);
}

module.exports = {
  getUserByUsername,
  getUserByID,
  newUser,
};