const mongoose = require('mongoose');
const User = require('../models/user.model');
const Post = require('../models/post.model');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    const users = await User.find();
    const posts = await Post.find();

    if (users.length === 0) {
      const seedUsers = [
        { name: 'Admin', email: 'admin@example.com', password: 'admin123' },
        { name: 'User', email: 'user@example.com', password: 'user123' }
      ];

      await User.insertMany(seedUsers);
      console.log('Users seeded');
    }

    const ids = await User.find().lean().select("_id");
    if (posts.length === 0) {
      const seedPosts = [
        { author: ids[0], title: 'First Post', content: 'This is the first post' },
        { author: ids[0], title: 'Second Post', content: 'This is the second post' }
      ];

      await Post.insertMany(seedPosts);
      console.log('Posts seeded');
    }

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

module.exports = seedDatabase;