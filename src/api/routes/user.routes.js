const UserRoutes = require('express').Router()
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/user.controller')
const { isAuth } = require('../../middlewares/auth.middleware');


UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)
// UserRoutes.post('/logout', logoutUser)
UserRoutes.post('/logout', [isAuth], logoutUser);

// MovieRoutes.patch('/:id', [isAuth], updateMovieById)
// MovieRoutes.delete('/:id', [isAuth], deleteMovieById)

// ActorRoutes.patch('/:id', [isAuth], updateActorById)
// ActorRoutes.delete('/:id', [isAuth], deleteActorById)

module.exports = UserRoutes