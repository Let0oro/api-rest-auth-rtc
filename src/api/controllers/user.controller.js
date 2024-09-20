const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../../utils/token");

async function registerUser(req, res, next) {
  try {
    const user = new User(req.body);
    const userExist = await User.findOne({ email: user.email });
    if (userExist) return next(new Error("User already exists"));

    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new Error());
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id, user.email);
      return res.status(200).json(token);
    }
  } catch (error) {
    return next(error);
  }
}

async function logoutUser(req, res, next) {
  try {
    const token = null;
    return res.status(201).json(token);
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const currentUser = req.user;
    const updateData = req.body;

    if (updateData.rol && currentUser.rol !== "admin") {
      return res.status(403).json({ message: "Unauthorized to change role" });
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const currentUser = req.user;

    if (id !== String(currentUser._id) && currentUser.rol !== "admin") {
      return res.status(403).json({ message: "Unauthorized to delete user" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
};
