const con = require("./db_connect");

// creates the mysql table
async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS posts (
      post_id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255),
      body LONGTEXT,
      user VARCHAR(255),
      date DATETIME DEFAULT NOW(),
      image LONGTEXT,
      thread_id INT,
      CONSTRAINT thread_pk PRIMARY KEY(post_id)
    )`;
    await con.query(sql);
}
createTable();

// gets all posts
let getPosts = async () => {
    const sql = `SELECT * FROM posts`;
    return await con.query(sql);
};

// makes a new post
async function makePost(post) {
    const sql = `INSERT INTO posts (title, body, user, image, thread_id)
    VALUES ("${post.title}", "${post.body}", "${post.user}", "${post.image}", "${post.thread_id}")
  `;

    const insert = await con.query(sql);
    return insert;
}

// gets a post using id object value
async function getPost(data) {
    return await getById(data.body.id);
}

// deletes a post by its ID
async function deletePost(id) {
    const sql = `DELETE FROM posts 
    WHERE post_id = ${id.id}
  `;
    await con.query(sql);
    return true;
}

// gets a post by its ID
async function getById(id) {
    let sql;
    if (id) {
        sql = `SELECT * FROM posts
        WHERE post_id = ${id}
      `;
    }
    const p = await con.query(sql);
    return p[0];
}

module.exports = { getPosts, getPost, makePost, deletePost };