const { StatusCodes } = require('http-status-codes')
const {
  BadRequestError,
  customAPIError,
  UnauthorizedError,
  NotFoundError,
} = require('../errors')
const { promisify } = require('util')
const scryptPromisify = promisify(require('crypto').scrypt)
const crypto_secret_key = process.env.CRYPTO_SECRET_KEY
const jwt_secret_key = process.env.JWT_SECRET_KEY
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.generateToken()
  return res.status(StatusCodes.CREATED).json({
    user: { _id: user._id, username: user.username, email: user.email },
    token,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please enter both email and password')
  }
  const user = await User.findOne({ email })
  if (!user) throw new NotFoundError(`User with email ${email} is not found`)
  const correctPassword = await user.checkPassword(password)
  if (!correctPassword) throw new UnauthorizedError('Incorrect password')
  const token = user.generateToken()
  return res
    .status(StatusCodes.OK)
    .json({ user: { _id: user._id, email, username: user.username }, token })
}

const changePassword = async (req, res) => {
  const user = {}
  return res.status(StatusCodes.OK).json({ user })
}

const deleteAccount = async (req, res) => {
  const { _id } = req.params
  const user = await User.findById(_id)
  await user.deleteOne()
  return res.status(StatusCodes.OK).json({ msg: 'success' })
}

module.exports = { login, register, changePassword, deleteAccount }
