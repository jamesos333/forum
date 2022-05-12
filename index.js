require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const userRoutes = require('./server/routes/user');
const threadRoutes = require('./server/routes/thread');
const postRoutes = require('./server/routes/post');
const boardRoutes = require('./server/routes/board');

// global post number
global.postNum = 3;

app.use(express.json()); //To parse JSON bodies (Applicable for Express 4.16+)

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname, '/public/index.html') ) 
})

app.use(express.static(__dirname + '/public', {
  extensions: ['html']
}));

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use("/users", userRoutes);
app.use("/threads", threadRoutes);
app.use("/posts", postRoutes);
app.use("/boards", boardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));