const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const VideoPost = require('../models/VideoPost');
const Comment = require('../models/Comment');

// Config multer pour upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
    filename: (req, file, cb) => {
        const safeName = file.originalname.replace(/\s+/g, '_');
        cb(null, Date.now() + '-' + safeName);
    }
});
const upload = multer({ storage });

// GET all videos
router.get('/', async (req, res) => {
    const videos = await VideoPost.find();
    res.json(videos);
});

// GET video by id
router.get('/:id', async (req, res) => {
    const video = await VideoPost.findById(req.params.id);
    res.json(video);
});

// POST create video
router.post('/', upload.single('video'), async (req, res) => {
    const { title, description, author } = req.body;
    const videoUrl = req.file.filename; // ✅ juste le nom du fichier
    const newVideo = new VideoPost({ title, description, author, videoUrl });
    const savedVideo = await newVideo.save();
    res.json(savedVideo);
});

// POST like video
router.post('/:id/like', async (req, res) => {
    const video = await VideoPost.findById(req.params.id);
    video.likes += 1;
    await video.save();
    res.json(video);
});

// POST add comment
router.post('/:id/comments', async (req, res) => {
    const { user, text } = req.body;
    const newComment = new Comment({ videoId: req.params.id, user, text });
    const savedComment = await newComment.save();
    res.json(savedComment);
});

// GET comments for video
router.get('/:id/comments', async (req, res) => {
    const comments = await Comment.find({ videoId: req.params.id });
    res.json(comments);
});

module.exports = router;
