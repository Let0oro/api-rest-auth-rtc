const UserRoutes = require('express').Router()
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/user.controller')
const { isAuth } = require('../../middlewares/auth.middleware');


UserRoutes.post('/register', registerUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAuth], logoutUser);


module.exports = UserRoutes