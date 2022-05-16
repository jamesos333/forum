import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
    from './main.js'

//builds the forum.html page and fills with all current threads
const threads = document.querySelector('threads');
const template = await (await fetch('/elements/threadheader.html')).text();

//gets the thread number by referencing the url tags
const urlParams = new URLSearchParams(window.location.search);
const boardId = urlParams.get('id');

//gets the board info and fills it into the page
fetchData('/boards/getboard/', { id: boardId }, "POST")
    .then((data) => {
        if (!data.message) {
            document.querySelector("#boardtitle").innerHTML = data.title + ": " + data.body;
            document.title += " " + data.title;
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#thread-box p.error").innerHTML = errText;
        console.log(`Error! ${errText}`)
        window.location.href = "/404";
    });

//gets all the threads on the specified board
fetchData('/boards/getthreadsonboard/', { id: boardId }, "POST")
    .then((data) => {
        if (!data.message) {
            buildThreads(data);
        }
    })
    .catch((error) => {
        const errText = error.message;
        document.querySelector("#thread-box p.error").innerHTML = errText;
        console.log(`Error! ${errText}`)
    });

//builds the thread elements on the board
function buildThreads(allThreads) {
    //makes the amount of threads but blank
    for (let i = 0; i < allThreads.length; i++) {
        threads.innerHTML += template;
    }
    //fills in the blank threads with the info
    var titles = document.querySelectorAll('[id="thread-title"]');
    var usernames = document.querySelectorAll('[id="username"]');
    var ids = document.querySelectorAll('[id="thread-id"]');
    for (let i = 0; i < titles.length; i++) {
        //adds in the titles
        titles[titles.length - i - 1].innerHTML = allThreads[i].title;
        titles[titles.length - i - 1].href = "thread?id=" + allThreads[i].thread_id;
        //adds in the username / date line
        usernames[usernames.length - i - 1].innerHTML = allThreads[i].user + " | " + allThreads[i].date;
        //puts in the thread id's
        ids[ids.length - i - 1].innerHTML = "#" + allThreads[i].thread_id;
    }
}
