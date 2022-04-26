const Thread = require('../models/thread');
const User = require('../models/user');
const posts = [
    {
        postId: 1,
        title: "I HATE THIS THING THAT YOU LIKE",
        body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nostrum at perferendis, soluta earum dolorem reiciendis aperiam expedita. Beatae cum nam pariatur unde numquam nihil dolore laboriosam saepe sed amet?",
        user: "jameshater",
        date: "04/08/2022",
        threadId: 1
    }
]

let getPosts = () => posts;

function makePost(data) {
    postNum++;
    const newPost = {
        postId: postNum,
        title: data.title,
        body: data.body,
        user: data.user,
        threadId: data.threadId,
        date: formatDate(new Date()),
    }
    posts.push(newPost);
    Thread.addReply( {post: newPost, threadId: data.threadId} );
    return newPost;
}

function getPost(id) {
    //console.log( threads[id.body.id] );
    return posts[id.body.id];
  }

// for formatting the date
function formatDate(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

module.exports = { getPost, makePost };