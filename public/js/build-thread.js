import { fetchData, getData, getCurrentUser, setCurrentUser, removeCurrentUser }
  from './main.js'


const repliesLocation = document.querySelector('replies');
const template = await (await fetch('/elements/post.html')).text();

//gets the thread number by referencing the url tags
const urlParams = new URLSearchParams(window.location.search);
const threadId = urlParams.get('id');


var threadImg = document.getElementById("thread-image");
// enlarges main image if clicked on
threadImg.addEventListener("click", function (i) {
  if (threadImg.classList.contains("postimg-click")) {
    threadImg.classList.remove('postimg-click');
  } else {
    threadImg.classList.add('postimg-click');
  }
  threadImg.classList.toggle('postimg-thumb');
});

// gets a specific thread
fetchData('/threads/getthread/', { id: threadId }, "POST")
  .then((data) => {
    if (!data.message) {
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
  document.getElementById("thread-image").src = data.image;
  document.getElementById("thread-username").innerHTML = data.user.userName + " | " + data.date;
  document.getElementById("thread-id").innerHTML = "#" + data.threadId;

  // makes the posts but blank
  var replies = data.replies;
  for (let i = 0; i < replies.length; i++) {
    repliesLocation.innerHTML += template;
  }

  // fills in each blank post with data
  var titles = document.querySelectorAll('[id="post-title"]');
  var usernames = document.querySelectorAll('[id="post-username"]');
  var bodies = document.querySelectorAll('[id="post-body"]');
  var ids = document.querySelectorAll('[id="post-id"]');
  for (let i = 0; i < titles.length; i++) {
    //adds in the titles and body
    titles[titles.length - i - 1].innerHTML = replies[i].title;
    bodies[bodies.length - i - 1].innerHTML = replies[i].body;
    // post ids
    ids[ids.length - i - 1].innerHTML = "#" + replies[i].postId;
    //adds in the username and date line
    usernames[usernames.length - i - 1].innerHTML = replies[i].user + " | " + replies[i].date;
  }
  //console.log(replies);
}