const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protectRoute = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token.
      token = req.headers.authorization.split(' ')[1]

      // Verify token.
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from token.
      req.user = await User.findById(verifiedToken.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Access denied.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Access denied.')
  }
})

module.exports = {
  protectRoute
}