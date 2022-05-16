require('dotenv').config();
const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');

app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

//CORS middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

const userRoutes = require('./server/routes/user');
const threadRoutes = require('./server/routes/thread');
const postRoutes = require('./server/routes/post');
const boardRoutes = require('./server/routes/board');
const uploadRoutes = require('./server/routes/upload');

app.use("/users", userRoutes);
app.use("/threads", threadRoutes);
app.use("/posts", postRoutes);
app.use("/boards", boardRoutes);
app.use("/upload", uploadRoutes);

// displays the 404 page when something isnt found
app.all('*', (req, res) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));