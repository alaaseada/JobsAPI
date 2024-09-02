const { StatusCodes } = require('http-status-codes')
const customAPIError = require('./custom-error')

class BadRequestError extends customAPIError {
  constructor(message) {
    super(message), (this.status = StatusCodes.BAD_REQUEST)
  }
}

module.exports = BadRequestError
