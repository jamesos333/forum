const express = require('express');
const Thread = require('../models/thread');
const router = express.Router();

router
    .get('/', async (req, res) => {
        try {
            const threads = await Thread.getThreads();
            res.send(threads);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/getthread', async (req, res) => {
        try {
            const thread = await Thread.getThread(req);
            res.send(thread);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/getthreadsonboard', async (req, res) => {
        try {
            const threads = await Thread.getAllThreadsOnBoard(req);
            res.send(threads);
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/newthread', async (req, res) => {
        try {
            const thread = await Thread.makeThread(req.body);
            res.send({ ...thread })
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

    .post('/deletethread', async (req, res) => {
        try {
            const thread = await Thread.deleteThread(req);
            res.send({ ...thread });
        } catch (err) {
            res.status(401).send({ message: err.message });
        }
    })

    .post('/addreply', async (req, res) => {
        try {
            const thread = await Thread.addReply(req.body);
            res.send({ ...thread })
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    })

module.exports = router;
