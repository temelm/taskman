const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const {
  errorHandler
} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5001

/* ---------------- BEGIN DATABASE CONNECTION ---------------- */
const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`[taskman Server] Connected to database ${conn.connection.host}.`)
  } catch (error) {
    console.log(`[taskman Server] Failed to connect to database ${conn.connection.host}.`)
    console.error(error)
    process.exit(1)
  }
}

connectToDatabase()
/* ---------------- END DATABASE CONNECTION ---------------- */

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tasks', require('./routes/taskRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`[taskman Server] Listening on port ${PORT}.`))