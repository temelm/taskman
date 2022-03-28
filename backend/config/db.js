const mongoose = require('mongoose')

const connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`[taskman Server] Connected to database ${conn.connection.host}.`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = {
  connectToDatabase
}