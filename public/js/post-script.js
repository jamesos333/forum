import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
    from './main.js'

const threadBox = document.getElementById("thread-box");
if (threadBox) threadBox.addEventListener('submit', newThread);

const postBox = document.getElementById("post-box");
if (postBox) postBox.addEventListener('submit', newPost);

//gets the thread number by referencing the url
var url = window.location.pathname;
var threadId = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));

//creates a new thread
function newThread(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const user = getCurrentUser().username;

    fetchData('/threads/newthread', {title: title, body: body, user: user }, "POST")
    .then((data) => {
      if(!data.message) {
        location.reload();
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#reg-form p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    });

}

//for making new posts
function newPost(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const user = getCurrentUser().username;

    fetchData('/posts/makepost', {title: title, body: body, user: user, threadId: threadId }, "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data.title);
        console.log(data.body);
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#reg-form p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    });
}
