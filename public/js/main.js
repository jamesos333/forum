
//adds footer to all pages
const footer = document.querySelector('footer');
footer.innerHTML = await (await fetch('/elements/footer.html')).text();
//adds header to all pages
const nav = document.querySelector('nav');
nav.innerHTML = await (await fetch('/elements/navbar.html')).text();
//gets which tab is current
var url = window.location.pathname;
var currentPage = url.substring(url.lastIndexOf('/') + 1, url.length);

// customizes header if user is logged in
if (getCurrentUser()) {
  //console.log( getCurrentUser() );
  document.getElementById("login").outerHTML = '<a id="user" href="/user"></a>';
  document.getElementById("user").innerHTML = "hello, " + getCurrentUser().userName;
  document.getElementById("register").outerHTML = '<a id="logout" >Logout</a>';
}

// sets current page to active
if( document.getElementById(currentPage) !== null ) {
  document.getElementById(currentPage).classList.add('active');
} else if( !currentPage ) {
  document.getElementById("home").classList.add('active');
}

// Fetch method implementation:
export async function fetchData(url = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${url}`, {
    method: methodType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}

//functions for user
export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('user')
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export const logoutBtn = document.getElementById("logout");
if (logoutBtn) logoutBtn.addEventListener('click', logout)

export function logout() {
  removeCurrentUser();
  window.location.href = "/";
}