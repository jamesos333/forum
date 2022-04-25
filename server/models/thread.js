const threads = [
  {
    threadId: 1,
    title: "My favorite animal ever i love this thing",
    body: "hello everyone i'm just sharing how much i like this thing, please be nice thank you!",
    user: { userId: 1, userName: "admin", email: "test@test.com", birthday: "06/23/2000" },
    image: "/images/postimagetest.jpg",
    date: "04/02/2022",
    replies: [{ postId: 1, title: "I HATE THIS THING THAT YOU LIKE", body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nostrum at perferendis, soluta earum dolorem reiciendis aperiam expedita. Beatae cum nam pariatur unde numquam nihil dolore laboriosam saepe sed amet?", user: "jameshater", date: "04/08/2022", threadId: 1 }]
  },
  {
    threadId: 2,
    title: "Does anyone know how to unclog a toilet? (please)",
    body: "hello guys pls help very urgent i'm at my girlfriends house meeting her family i rlly messed up bad this time i shouldnt have had that taco bell oh god what am i gonna do please help",
    user: { userId: 1, userName: "admin", email: "test@test.com", birthday: "06/23/2000" },
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

function deleteThread(threadId) {
  let i = threads.map((threads) => threads.threadId).indexOf(threadId);
  threads.splice(i, 1);
  console.log(threads);
}

function addReply(reply) {
  threads[reply.threadId].replies.push(reply.post);
  //console.log( threads[reply.threadId].replies );
  return threads[reply.threadId].replies;
}

// for formatting the date
function formatDate(date) {
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

module.exports = { getThreads, makeThread, getThread, addReply, deleteThread };