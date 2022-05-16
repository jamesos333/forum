import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
  from './main.js'

var postnum = document.getElementById("postnum");
var threadnum = document.getElementById("threadnum");
var boardnum = document.getElementById("boardnum");
var boardslist = document.getElementById("boardslist");
var latestmember = document.getElementById("latestmember");

const boardDisplayTemplate = `<h3><a href="" id="board-link"></h3>`;

// gets the number of boards
var boards = await getData('http://localhost:3000/boards/');
var threads = await getData('http://localhost:3000/threads/');
var posts = await getData('http://localhost:3000/posts/');
var users = await getData('http://localhost:3000/users/');

// sets the values of the elements
boardnum.innerHTML = await boards.length;
threadnum.innerHTML= await threads.length;
postnum.innerHTML = await posts.length;
latestmember.innerHTML = await users[ users.length-1 ].userName;

// places the html for board links down but blank
for( var i = 0; i <= await boards.length-1; i++ ) {
  boardslist.innerHTML += boardDisplayTemplate;
}
// puts the data in the templates
for( var i = 0; i <= await boards.length-1; i++ ){
  var t = document.querySelectorAll('[id="board-link"]');
  t[i].innerHTML = boards[i].title + "- " + boards[i].body;
  t[i].href = "/forum?id=" + boards[i].board_id;
}

// gets data from a route
async function getData(e) {
  const response = await fetch(e, {
      method: 'GET',
  });
  return await response.json();
}
