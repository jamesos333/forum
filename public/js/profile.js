import { getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData }
  from './main.js'


let user = getCurrentUser();
var boardBox;

if (!user) window.location.href = "login.html";

// templates for login forms
const profile_form = await (await fetch('/elements/profile_form.html')).text();
const admin_form = await (await fetch('/elements/admin_form.html')).text();

let profile = document.getElementById("profile");
profile.innerHTML = `
  <h2>Welcome back, ${user.userName}!</h2>
  <div>
    <div id="admincontrols"></div>
    <button class="btn" id="edit">Edit Info</button>
    <button class="btn" id="delete">Delete Account</button>
  </div>
`;

// adds admin controls if admin is logged in
if (user.userName == "admin") {
  document.getElementById("delete").outerHTML = `
    <button class="btn" id="admin-controls">Admin Controls</button>
`;
}

document.getElementById("edit").addEventListener('click', editProfile);

// checks weather to attach event listener for delete or for admin
if (document.getElementById("delete")) {
  document.getElementById("delete").addEventListener('click', deleteAccount);
} else {
  document.getElementById("admin-controls").addEventListener('click', adminControls);
}

function editProfile() {
  profile.classList.toggle("hide");
  let editForm = document.getElementById("editForm");
  editForm.innerHTML = profile_form;

  //activates username submit button
  document.getElementById("usernamesubmit").addEventListener('click', editUsername);
  //activates password submit button
  document.getElementById("passwordsubmit").addEventListener('click', editPassword);
  // activates cancel button
  document.getElementById("cancel").addEventListener('click', (e) => {
    location.reload();
  })
}

function adminControls() {
  profile.classList.toggle("hide");
  let editForm = document.getElementById("editForm");
  editForm.innerHTML = admin_form;

  //activates thread delete button
  document.getElementById("deletethreadsubmit").addEventListener('click', deleteThread);
  //activates post delete button
  document.getElementById("deletepostsubmit").addEventListener('click', deletePost);
  //activates board creation button
  // form data for the board form
  boardBox = document.getElementById("board-box");
  document.getElementById("makeboardsubmit").addEventListener('click', makeBoard);
  // activates cancel button
  document.getElementById("cancel").addEventListener('click', (e) => {
    location.reload();
  })
}

// creates a new board
async function makeBoard(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const img = "images/user/" + await imageUpload(boardBox);

  // creates new board
  fetchData('/boards/makeboard', { title: title, body: body, image: img }, "POST")
    .then((data) => {
      if (!data.message) {
        boardBox.reset();
        document.querySelector("p.error").innerHTML = "Board Creation Successful!";
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    });
}

function deleteThread(e) {
  e.preventDefault();

  const deleteThreadID = document.getElementById("deletethread").value;
  fetchData('/threads/deletethread', { id: deleteThreadID }, "POST")
    .then((data) => {
      if (!data.message) {
        document.querySelector("p.error").innerHTML = "Thread Successfully Deleted";
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    });
}

function deletePost(e) {
  e.preventDefault();

  const deletePostID = document.getElementById("deletepost").value;
  fetchData('/posts/deletepost', { id: deletePostID }, "POST")
    .then((data) => {
      if (!data.message) {
        document.querySelector("p.error").innerHTML = "Post Successfully Deleted";
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    });
}

function editUsername(e) {
  e.preventDefault();

  const newUsername = document.getElementById("username").value;
  fetchData('/users/newusername', { userName: newUsername, userId: user.user_id }, "POST")
    .then((data) => {
      if (!data.message) {
        setCurrentUser(data);
        window.location.href = "/"
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#login-form p.error").innerHTML = errText;
      document.getElementById("pswd").value = "";
      console.log(`Error! ${errText}`)
    });
}

function editPassword(e) {
  e.preventDefault();
  console.log("here");
  const newPassword = document.getElementById("pswd").value;
  fetchData('/users/newpassword', { password: newPassword, userId: user.user_id }, "POST")
    .then((data) => {
      if (!data.message) {
        logout();
        window.location.href = "/"
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#login-form p.error").innerHTML = errText;
      document.getElementById("pswd").value = "";
      console.log(`Error! ${errText}`)
    });
}

function deleteAccount() {
  if (confirm('Are you sure you want to delete your account???')) {
    fetchData('/users/delete', { userId: user.user_id }, "DELETE")
      .then((data) => {
        if (!data.message) {
          console.log(data.success)
          logout();
          window.location.href = "/"
        }
      })
      .catch((error) => {
        const errText = error.message;
        document.querySelector("#profile div p.error").innerHTML = errText;
        console.log(`Error! ${errText}`)
      })
  }
}

// handles multer image uploads
async function imageUpload(e) {
  //sends the form data to multer
  let formData = new FormData(e);
  const response = await fetch('http://localhost:3000/upload/', {
    method: 'POST',
    body: formData
  });
  return await response.text();
}