import 
{ fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } 
from './main.js'

const loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

//function for logging in
function login(e) {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const pswd = document.getElementById("password").value;
  fetchData('/users/login', {username: name, password: pswd}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#login-form p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}

//function for registering
const regForm = document.getElementById("reg-form");
if(regForm) regForm.addEventListener('submit', register);

function register(e) {
  e.preventDefault();

  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const birthday = document.getElementById("birthday").value;
  const pswd = document.getElementById("password").value;

  fetchData('/users/register', {username: name, password: pswd, email: email, birthday: birthday}, "POST")
  .then((data) => {
    if(!data.message) {
      setCurrentUser(data);
      window.location.href = "index.html";
    }
  })
  .catch((error) => {
    const errText = error.message;
    document.querySelector("#reg-form p.error").innerHTML = errText;
    document.getElementById("pswd").value = "";
    console.log(`Error! ${errText}`)
  });
}
