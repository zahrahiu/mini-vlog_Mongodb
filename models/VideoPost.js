const mongoose = require('mongoose');

const VideoPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    author: { type: String, default: "Anonymous" },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("VideoPost", VideoPostSchema);
