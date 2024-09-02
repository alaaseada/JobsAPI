const { StatusCodes } = require('http-status-codes')
const customAPIError = require('./custom-error')

class UnauthorizedError extends customAPIError {
  constructor(message) {
    super(message), (this.status = StatusCodes.UNAUTHORIZED)
  }
}

module.exports = UnauthorizedError
