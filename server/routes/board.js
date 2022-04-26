const express = require('express');
const Board = require('../models/board');
const router = express.Router();

router
    .get('/', (req, res) => {
        try {
            const boards = Board.getBoards();
            res.send(boards);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

module.exports = router;
