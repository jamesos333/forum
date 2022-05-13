const con = require("./db_connect");

// creates the mysql table
async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS boards (
    board_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    body LONGTEXT,
    image LONGTEXT,
    CONSTRAINT board_pk PRIMARY KEY(board_id)
  )`;
  await con.query(sql);
  defaultBoards();
}
// creates the default boards if not yet initialized
async function defaultBoards() {
  const b = await boardExists("Music");
  if (b.length === 0) {
    const sql = `INSERT INTO boards (title, body, image)
  VALUES ("Music", "General Music Discussion", "images/music.png");`;
    const sql2 = `INSERT INTO boards (title, body, image)
  VALUES ("Film", "General Film Discussion", "images/movies.jpg");`;
    const sql3 = `INSERT INTO boards (title, body, image)
  VALUES ("General", "General Discussion", "images/skull2.png");`;
    await con.query(sql);
    await con.query(sql2);
    await con.query(sql3);
  }
}
createTable();

let getBoards = async () => {
  const sql = `SELECT * FROM boards`;
  return await con.query(sql);
};

// get board by id object value
async function getBoard(data) {
  const b = await getById(data.body.id);
  return b[0];
}

async function boardExists(title) {
  const sql = `SELECT * FROM boards
    WHERE title = "${title}"
  `;
  return await con.query(sql);
}

// gets a thread by its ID and returns the thread
async function getById(id) {
  let sql;
  if(id) {
    sql = `SELECT * FROM boards
      WHERE board_id = ${id}
    `;
  } 
  const t = await con.query(sql);
  return t;
}

module.exports = { getBoards, getBoard, boardExists };