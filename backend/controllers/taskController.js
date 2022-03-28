const asyncHandler = require('express-async-handler')
const taskModel = require('../models/taskModel')
const Task = require('../models/taskModel')

/**
 * @description Get tasks.
 * @route       GET /api/tasks
 * @access      Private
 */
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json(tasks)
})

/**
 * @description Create task.
 * @route       POST /api/tasks
 * @access      Private
 */
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.summary) {
    res.status(400)
    throw new Error('Please enter a task summary.')
  }

  const task = await Task.create({
    summary: req.body.summary
  })

  res.status(200).json(task)
})

/**
 * @description Update task.
 * @route       PUT /api/tasks/:id
 * @access      Private
 */
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
  
  if (!task) {
    res.status(400)
    throw new Error(`Task ${req.params.id} not found.`)
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  
  res.status(200).json(updatedTask)
})

/**
 * @description Delete task.
 * @route       DELETE /api/tasks/:id
 * @access      Private
 */
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error(`Task ${req.params.id} not found.`)
  }

  await task.remove()

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