const Thread = require('../models/thread');
const User = require('../models/user');
const posts = [
    {
        postId: 2,
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
    Thread.addReply({ post: newPost, threadId: data.threadId });
    return newPost;
}

// gets post using object reference
function getPost(data) {
    return getById(data.body.id);
}

// deletes a post by its ID
function deletePost(data) {
    var tmpId = parseInt( data.id ); 
    let t = posts.map((posts) => posts.postId).indexOf(tmpId);
    Thread.removeReply( tmpId, posts[t].threadId );
    posts.splice(t, 1);
    return true;
}

// gets a post by its ID
function getById(id){
    var tmpId = parseInt( id ); 
    let i = posts.map((posts) => posts.postId).indexOf(tmpId);
    console.log(posts.map((posts) => posts.postId));
    return posts[i];
  }

// for formatting the date
function formatDate(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

module.exports = { getPost, makePost, deletePost };