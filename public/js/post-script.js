import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
  from './main.js'

const threadBox = document.getElementById("thread-box");
if (threadBox) threadBox.addEventListener('submit', newThread);

const postBox = document.getElementById("post-box");
if (postBox) postBox.addEventListener('submit', newPost);

//gets the thread number by referencing the url tags
const urlParams = new URLSearchParams(window.location.search);
const threadId = urlParams.get('id');

const user = getCurrentUser();

// creates a new thread
function newThread(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const img = document.getElementById("img").value;

  // checks if user is logged in before allowing a thread to be made
  if (user !== null) {
    fetchData('/threads/newthread', { title: title, body: body, user: user }, "POST")
      .then((data) => {
        if (!data.message) {
          threadBox.reset();
          location.reload();
        }
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("#reg-form p.error").innerHTML = errText;
        console.log(`Error! ${errText}`)
      });
  } else {
    const errText = "You must be logged in to make a thread!";
    document.querySelector("p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  }

}

// for making new posts
function newPost(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  // checks if user is logged in before allowing a thread to be made
  if (user !== null) {
    fetchData('/posts/makepost', { title: title, body: body, user: user.userName, thread_id: threadId }, "POST")
      .then((data) => {
        if (!data.message) {
          postBox.reset();
          location.reload();
        }
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("p.error").innerHTML = errText;
        console.log(`Error! ${errText}`)
      });
  } else {
    const errText = "You must be logged in to make a post!";
    document.querySelector("p.error").innerHTML = errText;
    console.log(`Error! ${errText}`)
  }
}