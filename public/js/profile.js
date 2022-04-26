import 
{ getCurrentUser, setCurrentUser, removeCurrentUser, logout, fetchData } 
from './main.js'


let user = getCurrentUser();

if(!user) window.location.href = "login.html";

let profile = document.getElementById("profile");
profile.innerHTML = `
  <h2>Welcome back, ${user.userName}!</h2>
  <div>
    <p class="error"></p>
    <div id="admincontrols"></div>
    <button class="btn" id="edit">Edit Info</button>
    <button class="btn" id="delete">Delete Account</button>
  </div>
`;

// adds admin controls if admin is logged in
if( user.userId == 1 ){
  document.getElementById("admincontrols").innerHTML += `
    <button class="btn" id="admincontrols">Admin Controls</button>
`;
}

document.getElementById("edit").addEventListener('click', editProfile);
document.getElementById("delete").addEventListener('click', deleteAccount);
document.getElementById("admincontrols").addEventListener('click', adminControls);

function editProfile() {
  profile.classList.toggle("hide");
  let editForm = document.getElementById("editForm");
  editForm.innerHTML = `
    <form id="form" class="basic-form">
      <p class="error"></p>
      <h2>Edit Profile</h2>
      <label for="username">Change Username</label>
      <input type="text" name="username" id="username" placeholder="${user.userName}">
      <br>
      <input type="submit" id="usernamesubmit" value="Submit">
    </form>

    <form id="passForm" class="basic-form">
      <p class="error"></p>
      <h2>Change Password</h2>
      <label for="pswd">Change Password</label>
      <input type="password" name="pswd" id="pswd">
      <br>
      <input type="submit" id="passwordsubmit" value="Submit">
    </form>
    <button class="btn" id="cancel">Cancel</button>
  `;

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
  editForm.innerHTML = `
    <form id="form" class="basic-form">
      <p class="error"></p>
      <h2>Delete Thread</h2>
      <label for="deletethread">Thread ID</label>
      <input type="number" name="deletethread" id="deletethread">
      <br>
      <input type="submit" id="deletethreadsubmit" value="Submit">
    </form>

    <form id="form" class="basic-form">
      <p class="error"></p>
      <h2>Delete Post</h2>
      <label for="deletepost">Post ID</label>
      <input type="number" name="deletepost" id="deletepost"">
      <br>
      <input type="submit" id="deletepostsubmit" value="Submit">
    </form>
    <button class="btn" id="cancel">Cancel</button>
  `;

  //activates username submit button
  document.getElementById("deletethreadsubmit").addEventListener('click', editUsername);
  //activates password submit button
  document.getElementById("deletepostsubmit").addEventListener('click', editPassword);
  // activates cancel button
  document.getElementById("cancel").addEventListener('click', (e) => {
    location.reload();
  })
}

function editUsername(e) {
    e.preventDefault();

    const newUsername = document.getElementById("username").value;
    fetchData('/users/newusername', {username: newUsername, userId: user.userId}, "POST")
    .then((data) => {
      if(!data.message) {
        setCurrentUser(data);
        window.location.href = "/index.html"
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
    fetchData('/users/newpassword', {password: newPassword, userId: user.userId}, "POST")
    .then((data) => {
      if(!data.message) {
        logout();
        window.location.href = "/index.html"
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
  if(confirm('Are you sure you want to delete your account?')) {
    fetchData('/users/delete', {userId: user.userId}, "DELETE")
    .then((data) => {
      if(!data.message) {
        //console.log(data.success)
        logout();
        window.location.href = "/index.html"
      }
    })
    .catch((error) => {
      const errText = error.message;
      document.querySelector("#profile div p.error").innerHTML = errText;
      console.log(`Error! ${errText}`)
    })
  }
}