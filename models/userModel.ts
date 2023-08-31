import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  forgotPasswordToken: {
    type: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  }
})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User
