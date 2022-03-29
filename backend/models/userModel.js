const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)