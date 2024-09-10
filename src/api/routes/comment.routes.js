const CommentRoutes = require("express").Router();
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const {
  createComment,
  getAllComments,
  getCommentById,
  deleteComment,
} = require("../controllers/comment.controller");

CommentRoutes.post("/", [isAuth], createComment);
CommentRoutes.get("/", isAuth, getAllComments);
CommentRoutes.get("/:id", isAuth, getCommentById);
CommentRoutes.delete("/:id", [isAuth, isAdmin], deleteComment);

module.exports = CommentRoutes;
