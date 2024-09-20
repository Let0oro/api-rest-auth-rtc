const express = require('express');
const PostController = require('../controllers/post.controller');
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', isAuth ,PostController.createPost);
router.put('/:id', isAuth, PostController.updatePost);
router.delete('/:id', isAuth, PostController.deletePost);

module.exports = router;
