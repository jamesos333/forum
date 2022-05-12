const con = require("./db_connect");

// creates the mysql table
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS threads (
    thread_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    body LONGTEXT,
    user VARCHAR(255),
    date DATETIME DEFAULT NOW(),
    image LONGTEXT,
    CONSTRAINT thread_pk PRIMARY KEY(thread_id)
  )`;
  await con.query(sql);
}
createTable();

let getThreads = async () => {
  const sql = `SELECT * FROM threads`;
  return await con.query(sql);
};

// makes and returns a new thread
async function makeThread(thread) {
  const sql = `INSERT INTO threads (title, body, user, image)
  VALUES ("${thread.title}", "${thread.body}", "${thread.user.userName}", "${thread.image}")
`;

  const insert = await con.query(sql);
  return insert;
}

// deletes a thread by its ID
async function deleteThread(id) {
  const sql = `DELETE FROM threads 
    WHERE thread_id = ${id.body.id}
  `;
  await con.query(sql);
}

// get thread by id object value
async function getThread(data) {
  const t = await getById(data.body.id);
  t.replies = await getReplies(data.body.id);
  return t;
}

// gets all the replies to a thread by sorting the posts table
async function getReplies(id) {
  let sql;
  if(id) {
    sql = `SELECT * FROM posts
      WHERE thread_id = ${id}
    `;
  } 
  const t = await con.query(sql);
  return t;
}

// gets a thread by its ID and returns the thread
async function getById(id) {
  let sql;
  if(id) {
    sql = `SELECT * FROM threads
      WHERE thread_id = ${id}
    `;
  } 
  const t = await con.query(sql);
  return t[0];
}


module.exports = { getThreads, makeThread, getThread, deleteThread };