const User = require('../api/models/user.model')
const { verifyToken } = require('../utils/token')


const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return next(new Error('Unauthorized'))
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
  } catch (error) {
    next(error)
  }
}


const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return next(new Error('Unauthorized'))
  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)

    if (!user) return res.status(404).json({message: "The user hasnt been founded"})

    if (user.rol != "admin") {
      return res
        .status(401)
        .json({ message: "You are not an admin, unauthorized!" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { isAuth, isAdmin }