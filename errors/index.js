const BadRequestError = require('./bad-request')
const customAPIError = require('./custom-error')
const UnauthorizedError = require('./unauthorized')
const NotFoundError = require('./not-found')

module.exports = {
  customAPIError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
}
