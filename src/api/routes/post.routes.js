const PostRoutes = require('express').Router();
const { isAuth, isAdmin } = require('../../middlewares/auth.middleware');
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} = require('../controllers/post.controller');

PostRoutes.post('/', [isAuth, isAdmin], createPost);
PostRoutes.get('/', isAuth, getAllPosts);
PostRoutes.get('/:id', isAuth, getPostById);
PostRoutes.delete('/:id', [isAuth, isAdmin], deletePost);

module.exports = PostRoutes;
