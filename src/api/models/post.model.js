const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
