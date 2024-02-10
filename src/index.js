const UserRoutes = require('./api/routes/user.routes')
const express = require('express');
const PORT = 3000;

const connectDB = require('./utils/db.js');
connectDB();

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use('/api/user', UserRoutes)

server.use('*', (res, req, next) => {
    const err = new Error('Route not found');
    err.status = 404;
    next(err)
})

// server.use( (err, res, req, next) => {
//     return res.status(err.status || 500).json(err.message || 'Unexpected error')
// })

server.listen(PORT, () => {
    console.log(`Server running in https://localhost:${PORT}`)
})