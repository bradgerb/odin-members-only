const pool = require("./pool");

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1", [username]
  );
  return rows
}

async function getUserByID(id) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE user_id = $1", [id]
  );
  return rows
}

async function newUser(username, password) {
  await pool.query(
    "INSERT INTO users (username, password, ismember, isadmin) \
    VALUES ($1, $2, false, false)", [username, password]
  );
}

async function becomeMember(username) {
  await pool.query(
    "UPDATE users \
    SET ismember = true \
    WHERE username = $1", [username]
  );
}

async function becomeAdmin(username) {
  await pool.query(
    "UPDATE users \
    SET isadmin = true \
    WHERE username = $1", [username]
  );
}

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT message_id, users.user_id, message, username, trim(TO_CHAR(date, 'FMDay, DD Mon YYYY HH12:MI AM')) AS date FROM messages \
    JOIN users ON users.user_id = messages.user_id \
    ORDER BY message_id"
  );
  return rows
}

async function postMessage(message, user_id) {
  await pool.query(
    "INSERT INTO messages (message, user_id) \
    VALUES ($1, $2)", [message, user_id]
  );
}

async function deleteUser(user_id) {
    await pool.query(
    "DELETE FROM users \
    WHERE user_id = $1", [user_id]
  );
}

async function deleteMessage(message_id) {
    await pool.query(
    "DELETE FROM messages \
    WHERE message_id = $1", [message_id]
  );
}

module.exports = {
  getUserByUsername,
  getUserByID,
  newUser,
  becomeMember,
  becomeAdmin,
  getMessages,
  postMessage,
  deleteUser,
  deleteMessage
};