const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    birthday VARCHAR(255),
    password VARCHAR(255),
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  )`;
  await con.query(sql);
  defaultUsers();
}
// creates default admin user
async function defaultUsers() {
  const users = ( await getUsers() );
  if (await users.length == 0) {
    const sql = `INSERT INTO users (userName, password, email, birthday)
  VALUES ("admin", "admin", "admin@nextengine.com", "2000-6-23");`;
  await con.query(sql);
  }
}
createTable();



let getUsers = async () => {
  const sql = `SELECT * FROM users`;
  return await con.query(sql);
};

async function login(username, password) {
  const user = await userExists(username);
  if (!user[0]) throw Error('User not found')
  if (user[0].password !== password) throw Error("Password is incorrect");

  return user[0];
}

async function register(user) {
  const u = userExists(user.username);
  if (u.length > 0) throw Error("Username already exists");

  const sql = `INSERT INTO users (userName, password, email, birthday)
    VALUES ("${user.username}", "${user.password}", "${user.email}", "${user.birthday}")
  `;

  const insert = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

async function deleteUser(userId) {
  const sql = `DELETE FROM users 
    WHERE user_id = ${userId}
  `;
  await con.query(sql);
}

async function newUsername(user) {
  const sql = `UPDATE users SET
    username = "${user.userName}"
    WHERE user_id = ${user.userId}
  `;
  const update = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

async function newPassword(user) {
  const sql = `UPDATE users SET
    password = "${user.password}"
    WHERE user_id = ${user.userId}
  `;
  const update = await con.query(sql);
  const newUser = await getUser(user);
  return newUser[0];
}

//gets user by user id
async function getUser(user) {
  let sql;
  if (user.userId) {
    sql = `SELECT * FROM users
      WHERE user_id = ${user.userId}
    `;
  } else {
    sql = `SELECT * FROM users
      WHERE username = "${user.username}"
    `;
  }

  return await con.query(sql);
}

async function userExists(username) {
  const sql = `SELECT * FROM users
    WHERE username = "${username}"
  `;
  return await con.query(sql);
}

module.exports = { getUsers, login, register, getUser, deleteUser, newUsername, newPassword };