const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({
    message: error.message,
    stack: (process.env.NODE_ENV === 'development') ? error.stack : null
  })
}

module.exports = {
  errorHandler
}