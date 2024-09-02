const { StatusCodes } = require('http-status-codes')
const NotFoundMiddleware = (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Invalid Route' })
}

module.exports = NotFoundMiddleware
