const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const { connectToDatabase } = require('./config/db')

const PORT = process.env.PORT || 5001

connectToDatabase()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(errorHandler)
app.use('/api/tasks', require('./routes/taskRoutes'))

app.listen(PORT, () => console.log(`[taskman Server] Listening on port ${PORT}.`))