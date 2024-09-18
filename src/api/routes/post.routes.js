const express = require('express');
const PostController = require('../controllers/post.controller');
const router = express.Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);
router.post('/', PostController.createPost);
router.put('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;
