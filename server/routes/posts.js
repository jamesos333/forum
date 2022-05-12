const express = require('express');
const Posts = require('../models/post');
const router = express.Router();

router
.get('/', async (req, res) => {
    try {
        const post = await Posts.getPosts();
        res.send(post);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post('/getpost', async (req, res) => {
    try {
        const post = await Posts.getPost(req);
        res.send(post);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post('/deletepost', async (req, res) => {
    try {
        const post = await Posts.deletePost(req.body);
        res.send({ ...post })
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})

.post('/makepost', async (req, res) => {
    try {
        const post = await Posts.makePost(req.body);
        res.send({ ...post })
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})


module.exports = router;
