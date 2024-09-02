const ErrorHandlerMiddleware = require('./error-handler')
const NotFoundMiddleware = require('./not-found')
const AuthenticationMiddleware = require('./authentication')

module.exports = {
  ErrorHandlerMiddleware,
  NotFoundMiddleware,
  AuthenticationMiddleware,
}
