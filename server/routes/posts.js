const express = require('express');
const Posts = require('../models/post');
const router = express.Router();

router
.get('/', (req, res) => {
    try {
        const post = Posts.getPosts();
        res.send(post);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post('/getpost', (req, res) => {
    try {
        const post = Posts.getPost(req);
        res.send(post);
    } catch (err) {
        res.status(401).send({ message: err.message });
    }
})

.post('/deletepost', (req, res) => {
    try {
        const post = Posts.deletePost(req.body);
        res.send({ ...post })
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})

.post('/makepost', (req, res) => {
    try {
        const post = Posts.makePost(req.body);
        res.send({ ...post })
    } catch (error) {
        res.status(401).send({ message: error.message });
    }
})


module.exports = router;
