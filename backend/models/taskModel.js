const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  summary: {
    type: String,
    required: [true, 'Please enter a task summary.']
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)