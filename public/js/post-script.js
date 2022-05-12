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
async function newThread(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const img = "images/" + await imageUpload();
  
  console.log( img );
  // checks if user is logged in before allowing a thread to be made
  if (user !== null) {
    fetchData('/threads/newthread', { title: title, body: body, user: user, image: img }, "POST")
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

// handles multer image uploads
async function imageUpload(e) {
  //sends the form data to multer
  let formData = new FormData(threadBox);
  const response = await fetch('http://localhost:3000/upload/', {
    method: 'POST',
    body: formData
  });
  return await response.text();
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