const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/api/tasks', require('./routes/taskRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`[Server] Listening on port ${PORT}.`))