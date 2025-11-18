const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'VideoPost', required: true },
    user: { type: String, default: "Anonymous" },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
