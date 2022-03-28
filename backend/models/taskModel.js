const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  summary: {
    type: String,
    required: [true, 'Please enter a task summary.']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)