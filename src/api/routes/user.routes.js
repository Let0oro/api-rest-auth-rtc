const express = require("express");
const UserController = require("../controllers/user.controller");
const { isAuth, isAdmin } = require("../../middlewares/auth.middleware");
const router = express.Router();

router.get("/get", UserController.getAllUsers);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", isAuth, UserController.logoutUser);
router.put("/:id", [isAuth, isAdmin], UserController.updateUser);
router.delete("/:id", [isAuth, isAdmin], UserController.deleteUser);

module.exports = router;