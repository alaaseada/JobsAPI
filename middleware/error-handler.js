const { StatusCodes } = require('http-status-codes')

const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong',
  }
  if (err.name === 'ValidationError') {
    console.log('I am here')
    let errors = {}
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message
    })
    console.log(errors)
    customError = {
      status: StatusCodes.BAD_REQUEST,
      msg: errors,
    }
  }
  if (err.name === 'MongoServerError') {
    if (err.errorResponse.code === 11000) {
      customError = {
        status: StatusCodes.BAD_REQUEST,
        msg: `The ${Object.keys(
          err.errorResponse.keyValue
        )} provided already exists`,
      }
    }
  }
  if (err.name === 'CastError') {
    customError = {
      status: StatusCodes.BAD_REQUEST,
      msg: `${err.stringValue} is an invalid ${err.kind}`,
    }
  }
  return res.status(customError.status).json({ msg: customError.msg })
}

module.exports = ErrorHandlerMiddleware
