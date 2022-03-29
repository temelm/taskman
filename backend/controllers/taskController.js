const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const User = require('../models/userModel')

/**
 * @description Get all tasks.
 * @route       GET /api/tasks
 * @access      Private
 */
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id
  })
  res.status(200).json(tasks)
})

/**
 * @description Create new task.
 * @route       POST /api/tasks
 * @access      Private
 */
const createTask = asyncHandler(async (req, res) => {
  // Validate required summary field.
  if (!req.body.summary) {
    res.status(400)
    throw new Error('Please enter a task summary.')
  }

  // Create new task.
  const task = await Task.create({
    summary: req.body.summary,
    user: req.user.id
  })

  // Respond.
  res.status(200).json(task)
})

/**
 * @description Update task.
 * @route       PUT /api/tasks/:id
 * @access      Private
 */
const updateTask = asyncHandler(async (req, res) => {
  // Check if specified task exists.
  const task = await Task.findById(req.params.id)
  if (!task) {
    res.status(400)
    throw new Error(`Task ${req.params.id} not found.`)
  }

  // Check if user exists.
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Check if task belongs to user.
  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Access denied.')
  }

  // Update existing task.
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  
  // Respond.
  res.status(200).json(updatedTask)
})

/**
 * @description Delete task.
 * @route       DELETE /api/tasks/:id
 * @access      Private
 */
const deleteTask = asyncHandler(async (req, res) => {
  // Check if specified task exists.
  const task = await Task.findById(req.params.id)
  if (!task) {
    res.status(400)
    throw new Error(`Task ${req.params.id} not found.`)
  }

  // Check if user exists.
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Check if task belongs to user.
  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('Access denied.')
  }

  // Delete existing task.
  await task.remove()

  // Respond.
  res.status(200).json({
    id: req.params.id
  })
})

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}