const express = require('express');
const Board = require('../models/board');
const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const boards = await Board.getBoards();
            res.send(boards);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })
    
    .post('/getboard', async (req, res) => {
        try {
            const thread = await Board.getBoard(req);
            res.send(thread);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/getthreadsonboard', async (req, res) => {
        try {
            const threads = await Board.getAllThreadsOnBoard(req);
            res.send(threads);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

module.exports = router;
