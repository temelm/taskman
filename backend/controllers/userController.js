const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const generateToken = (id) => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

/**
 * @description Create new user.
 * @route       POST /api/users
 * @access      Public
 */
const createUser = asyncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body

  // Validate required email and password fields.
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter your email and password.')
  }

  // Check if specified email is available.
  const userExists = await User.findOne({
    email
  })
  if (userExists) {
    res.status(400)
    throw new Error(`${email} is unavailable. Please enter another email.`)
  }

  // Hash password.
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create new user.
  const user = await User.create({
    email,
    password: hashedPassword
  })

  // Respond.
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Failed to create user.')
  }
})

/**
 * @description Login user.
 * @route       POST /api/users/login
 * @access      Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body

  // Check if specified user exists, authenticate password and respond.
  const user = await User.findOne({
    email
  })
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Incorrect email or password.')
  }
})

/**
 * @description Get user.
 * @route       GET /api/users
 * @access      Private
 */
const getUser = asyncHandler(async (req, res) => {
  const {
    _id,
    email
  } = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    email
  })
})

module.exports = {
  createUser,
  loginUser,
  getUser
}