const express = require("express");
const UserController = require("../controllers/UserController");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", isAuth, isAdmin, UserController.getAllUsers);
router.get("/:id", isAuth, UserController.getUserById);
router.put("/:id", isAuth, UserController.updateUser);
router.delete("/:id", isAuth, UserController.deleteUser);

module.exports = router;
