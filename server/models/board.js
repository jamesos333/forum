const boards = [
    {
      boardId: 1,
      title: "general",
      body: "All general discussions",
      threads: []
    }
  ]
  
  let getBoards = () => threads;
  
  function makeBoard(data) {
    const newBoard = {
      boardId: boards[boards.length - 1].boardId + 1,
      title: data.title,
      body: data.body,
      threads: []
    }
    boards.push(newBoard);
    return newBoard;
  }
  
  
  module.exports = { getBoards, makeBoard };