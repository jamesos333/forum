import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
    from './main.js'

const threadBox = document.getElementById("thread-box");
if (threadBox) threadBox.addEventListener('submit', newThread);

const postBox = document.getElementById("post-box");
if (postBox) postBox.addEventListener('submit', newPost);

//creates a new thread
function newThread(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const user = getCurrentUser().userName;

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

    console.log(body);
}