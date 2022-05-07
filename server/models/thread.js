const threads = [
  {
    threadId: 1,
    title: "My favorite animal ever i love this thing",
    body: "hello everyone i'm just sharing how much i like this thing, please be nice thank you!",
    user: { userId: 1, userName: "admin", email: "test@test.com", birthday: "06/23/2000" },
    image: "/images/postimagetest.jpg",
    date: "04/02/2022",
    replies: [{ postId: 2, title: "I HATE THIS THING THAT YOU LIKE", body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui nostrum at perferendis, soluta earum dolorem reiciendis aperiam expedita. Beatae cum nam pariatur unde numquam nihil dolore laboriosam saepe sed amet?", user: "jameshater", date: "04/08/2022", threadId: 1 }]
  },
  {
    threadId: 3,
    title: "Does anyone know how to unclog a toilet? (please)",
    body: "hello guys pls help very urgent i'm at my girlfriends house meeting her family i rlly messed up bad this time i shouldnt have had that taco bell oh god what am i gonna do please help",
    user: { userId: 1, userName: "admin", email: "test@test.com", birthday: "06/23/2000" },
    image: "/images/postimagetest2.jpg",
    date: "04/09/2022",
    replies: []
  }
]

let getThreads = () => threads;

// makes and returns a new thread
function makeThread(thread) {
  postNum++;
  const newThread = {
    threadId: postNum,
    threadNum: threads[threads.length - 1].threadId + 1,
    title: thread.title,
    body: thread.body,
    user: thread.user,
    image: "/images/postimagetest2.jpg",
    date: formatDate(new Date()),
    replies: []
  }
  threads.push(newThread);
  return newThread;
}

// deletes a thread by its ID
function deleteThread(data) {
  var tmpId = parseInt(data.body.id);
  let t = threads.map((threads) => threads.threadId).indexOf(tmpId);
  if (t !== -1) {
    threads.splice(t, 1);
    return true;
  } else {
    return false;
  }
}

// adds reply to a thread
function addReply(reply) {
  var t = getById(reply.threadId);
  // pushes post into replies array
  t.replies.push(reply.post);
  // bumps thread to the top
  threads.splice( getByIdId(reply.threadId), 1 )
  threads.push(t);
  return t.replies;
}

// get thread by id object value
function getThread(data) {
  return getById(data.body.id);
}

// gets a thread by its ID and returns the thread
function getById(id) {
  var tmpId = parseInt(id);
  let i = threads.map((threads) => threads.threadId).indexOf(tmpId);
  return threads[i];
}

// gets a thread by its ID and returns the index
function getByIdId(id) {
  var tmpId = parseInt(id);
  let i = threads.map((threads) => threads.threadId).indexOf(tmpId);
  return i;
}

// deletes a reply in a thread
function removeReply(postId, threadId) {
  var r = getById(threadId).replies;
  let i = r.map((r) => r.postId).indexOf(postId);
  r.splice(i, 1);
  return true;
}

// for formatting the date
function formatDate(date) {
  return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

module.exports = { getThreads, makeThread, getThread, addReply, deleteThread, removeReply };