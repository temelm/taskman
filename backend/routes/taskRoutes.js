const express = require('express')
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController')
const {
  protectRoute
} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protectRoute, getTasks).post(protectRoute, createTask)
router.route('/:id').put(protectRoute, updateTask).delete(protectRoute, deleteTask)

module.exports = router