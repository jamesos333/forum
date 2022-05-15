import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
  from './main.js'


const repliesLocation = document.querySelector('replies');
const template = await (await fetch('/elements/post.html')).text();

//gets the thread number by referencing the url tags
const urlParams = new URLSearchParams(window.location.search);
const threadId = urlParams.get('id');


var threadImg = document.getElementById("thread-image");
// enlarges main image if clicked on
threadImg.addEventListener("click", function (i) {
  if (threadImg.classList.contains("threadimg-click")) {
    threadImg.classList.remove('threadimg-click');
  } else {
    threadImg.classList.add('threadimg-click');
  }
  threadImg.classList.toggle('threadimg-thumb');
});

// gets a specific thread
fetchData('/threads/getthread/', { id: threadId }, "POST")
  .then((data) => {
    if (!data.message) {
      document.title += " " + data.title;
      buildPage(data);
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#post-box p.error").innerHTML = errText;
    console.log(`Error! ${errText}`);
    window.location.href = "/404";
  });

function buildPage(data) {
  //builds the main post
  document.getElementById("thread-title").innerHTML = data.title;
  document.getElementById("thread-body").innerHTML = data.body;
  document.getElementById("thread-image").src = data.image;
  document.getElementById("thread-username").innerHTML = data.user + " | " + data.date;
  document.getElementById("thread-id").innerHTML = "#" + data.thread_id;

  // makes the posts but blank
  var replies = data.replies;
  for (let i = 0; i < replies.length; i++) {
    repliesLocation.innerHTML += template;
  }

  // fills in each blank post with data
  var titles = document.querySelectorAll('[id="post-title"]');
  var usernames = document.querySelectorAll('[id="post-username"]');
  var images = document.querySelectorAll('[id="post-img"]');
  var bodies = document.querySelectorAll('[id="post-body"]');
  var ids = document.querySelectorAll('[id="post-id"]');
  for (let i = 0; i < titles.length; i++) {
    //adds in the titles and body
    titles[ i ].innerHTML = replies[i].title;
    bodies[ i ].innerHTML = replies[i].body;
    // adds in the post images
    if( replies[i].image != "undefined" ) {
      images[ i ].src = replies[i].image;
    } else {
      images[ i ].outerHTML = '';
    }
    // post ids
    ids[ i ].innerHTML = "#" + replies[i].post_id;
    //adds in the username and date line
    usernames[ i ].innerHTML = replies[i].user + " | " + replies[i].date;
  }
  //console.log(replies);
}