const express = require('express')
const {
  createUser,
  loginUser,
  getUser
} = require('../controllers/userController')
const {
  protectRoute
} = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/', protectRoute, getUser)

module.exports = router