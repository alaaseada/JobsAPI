const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')
const jwt_secret_key = process.env.JWT_SECRET_KEY

const AuthenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]
    try {
      const { userId } = jwt.verify(token, jwt_secret_key)
      if (userId) {
        req.userId = userId
        next()
      } else {
        throw new UnauthorizedError('Unauthorized to access this Job list')
      }
    } catch (error) {
      throw new UnauthorizedError('Unauthorized to access this Job list')
    }
  } else {
    throw new UnauthorizedError('No token is found')
  }
}

module.exports = AuthenticationMiddleware
