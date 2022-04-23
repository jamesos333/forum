const threads = [
  {
    threadId: 1,
    title: "My favorite animal ever i love this thing",
    body: "hello everyone i'm just sharing how much i like this thing, please be nice thank you!",
    user: "james",
    date: "04/02/2022",
    replies: null
  },
  {
    threadId: 2,
    title: "Does anyone know how to unclog a toilet? (please)",
    body: "hello guys pls help very urgent i'm at my girlfriends house meeting her family i rlly messed up bad this time i shouldnt have had that taco bell oh god what am i gonna do please help",
    user: "joe",
    date: "04/09/2022",
    replies: []
  }
]

let getThreads = () => threads;

function makeThread(thread) {
  const newThread = {
    threadId: threads[threads.length - 1].threadId + 1,
    title: thread.title,
    body: thread.body,
    user: thread.user,
    date: formatDate(new Date()),
    replies: null
  }
  threads.push(newThread);
  return newThread;
}

function getThread(id) {
  //console.log( threads[id.body.id] );
  return threads[id.body.id];
}

function addReply(reply) {
  //console.log( threads[id.body.id] );
  threads[reply.threadId].replies.push( reply.postId );
  return threads[reply.threadId].replies;
}

// for formatting the date
function formatDate(date) {
  return (date.getMonth()+1)+'/'+date.getDate() +'/'+ date.getFullYear(); 
}

module.exports = { getThreads, makeThread, getThread, addReply };