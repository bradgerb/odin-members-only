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
    await pool.query("INSERT INTO users (username, password, ismember, isadmin) \
      VALUES ($1, $2, false, false)", [username, password]);
}

async function becomeMember(username) {
  await pool.query("UPDATE users \
    SET ismember = true \
    WHERE username = $1", [username]);
}

async function becomeAdmin(username) {
  await pool.query("UPDATE users \
    SET isadmin = true \
    WHERE username = $1", [username]);
}

module.exports = {
  getUserByUsername,
  getUserByID,
  newUser,
  becomeMember,
  becomeAdmin
};