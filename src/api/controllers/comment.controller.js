const Comment = require('../models/comment.model');

const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, author: req.user._id });
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find().populate('author post');
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('author post');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    return res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, getAllComments, getCommentById, deleteComment };
