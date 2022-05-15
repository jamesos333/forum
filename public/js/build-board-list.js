import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser }
    from './main.js'

//builds the forum.html page and fills with all current threads
const boards = document.querySelector('boards');
const template = await (await fetch('/elements/boardheader.html')).text();

//gets the board info and fills it into the page
buildBoards(await getBoards());

async function getBoards(e) {
    const response = await fetch('http://localhost:3000/boards/', {
        method: 'GET',
    });
    return await response.json();
}

//builds the board links
function buildBoards(allBoards) {
    //makes the amount of boards but blank
    for (let i = 0; i < allBoards.length; i++) {
        boards.innerHTML += template;
    }

    //fills in the blank threads with the info
    var title = document.querySelectorAll('[id="board-title"]');
    var body = document.querySelectorAll('[id="board-body"]');
    var img = document.querySelectorAll('[id="board-image"]');
    var link = document.querySelectorAll('[id="board-link"]');
    for (let i = 0; i < title.length; i++) {
        //adds in the titles
        title[i].innerHTML = allBoards[i].title;
        //adds in the bodies
        body[i].innerHTML = allBoards[i].body;
        //adds in the images
        img[i].src = allBoards[i].image;
        //adds in the links
        title[i].href = "forum?id=" + allBoards[i].board_id;
        link[i*2].href = "forum?id=" + allBoards[i].board_id;
    }
}
