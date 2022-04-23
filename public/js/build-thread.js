import { fetchData, getData, getCurrentUser, setCurrentUser, removeCurrentUser }
    from './main.js'


const threads = document.querySelector('thread-header');

//gets the thread number by referencing the url
var url = window.location.pathname;
var threadId = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));

// gets a specific thread
fetchData('/threads/getthread/', {id: threadId-1}, "POST")
.then((data) => {
  if(!data.message) {
    buildPage(data);
  }
})
.catch((error) => {
  const errText = error.message;
  document.querySelector("#login-form p.error").innerHTML = errText;
  console.log(`Error! ${errText}`)
});

function buildPage(data) {
    //builds the main post
    document.getElementById("thread-title").innerHTML = data.title;
    document.getElementById("thread-body").innerHTML = data.body;
    document.getElementById("thread-username").innerHTML = data.user + " | " + data.date;
}