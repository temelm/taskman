const asyncHandler = require('express-async-handler')

/**
 * @description Get tasks.
 * @route       GET /api/tasks
 * @access      Private
 */
const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'GET TASKS'
  })
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

  res.status(200).json({
    message: 'CREATE TASK'
  })
})

/**
 * @description Update task.
 * @route       PUT /api/tasks/:id
 * @access      Private
 */
const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `UPDATE TASK ${req.params.id}`
  })
})

/**
 * @description Delete task.
 * @route       DELETE /api/tasks/:id
 * @access      Private
 */
const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `DELETE TASK ${req.params.id}`
  })
})

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}