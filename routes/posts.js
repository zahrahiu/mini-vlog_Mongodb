const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET ALL POSTS
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// GET ONE POST BY ID
router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
});

// CREATE POST
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost);
});

// UPDATE POST
router.put('/:id', async (req, res) => {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
});

module.exports = router;
