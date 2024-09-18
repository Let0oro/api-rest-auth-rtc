const UserRoutes = require('./api/routes/user.routes');
const PostRoutes = require('./api/routes/post.routes');
const CommentRoutes = require('./api/routes/comment.routes');
const express = require('express');
const PORT = 3000;

const connectDB = require('./utils/db.js');
connectDB();

const seedDatabase = require('./api/seed/seed.js');
seedDatabase()

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/api/user', UserRoutes);
server.use('/api/posts', PostRoutes);
server.use('/api/comments', CommentRoutes);

server.use('*', (res, req, next) => {
    const err = new Error('Route not found');
    err.status = 404;
    next(err);
});

server.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}`);
});
