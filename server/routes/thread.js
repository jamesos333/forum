const express = require('express');
const Thread = require('../models/thread');
const router = express.Router();

router
    .get('/', (req, res) => {
        try {
            const threads = Thread.getThreads();
            res.send(threads);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/getthread', (req, res) => {
        try {
            const thread = Thread.getThread(req);
            res.send(thread);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/newthread', (req, res) => {
        try {
            const thread = Thread.makeThread(req.body);
            res.send({ ...thread })
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/addreply', (req, res) => {
        try {
            const thread = Thread.addReply(req.body);
            res.send({ ...thread })
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

module.exports = router;
