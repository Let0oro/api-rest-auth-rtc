const mongoose = require("mongoose");
const User = require("../models/user.model");
const Post = require("../models/post.model");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      const seedUsers = [
        {
          name: "Admin",
          email: "admin@example.com",
          emoji: "💥",
          password: "admin123",
        },
        {
          name: "User",
          email: "user@example.com",
          emoji: "🍔",
          password: "user1234",
        },
      ];

      await User.insertMany(seedUsers);
      console.log("Users seeded");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seedDatabase;
