const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator  = require('validator')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    emoji: { type: String, trim: true, required: true },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [8, 'Password 8 characters minimum'],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      validate: [validator.isEmail, 'Email is not valid'],
    },
    rol: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10)
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('users', userSchema)
module.exports = User