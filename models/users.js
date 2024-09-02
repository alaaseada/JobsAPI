const { Schema, model } = require('mongoose')
const Job = require('./jobs')
const { promisify } = require('util')
const scryptPromisify = promisify(require('crypto').scrypt)
const crypto_secret_key = process.env.CRYPTO_SECRET_KEY
const jwt_secret_key = process.env.JWT_SECRET_KEY
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    maxLength: [50, 'Username cannot exceed 50 characters'],
    unique: [true, 'Username is already in use'],
    trim: true,
    lowerCase: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxLength: [50, 'Email cannot exceed 50 characters'],
    unique: [true, 'This Email is already registered'],
    match: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
    trim: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
})

// After deleting a user, delete their jobs
userSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function (doc) {
    await Job.deleteMany({ userId: doc._id })
  }
)

// before saving a new user, hash their password
userSchema.pre('save', async function (next) {
  let hashedPassword = await scryptPromisify(
    this.password,
    crypto_secret_key,
    16
  )
  this.password = hashedPassword.toString('hex')
  return next()
})

// generate a token to the user
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ userId: this._id }, jwt_secret_key, {
    expiresIn: '1d',
  })
  return token
}

// Compare password at login
userSchema.methods.checkPassword = async function (password) {
  const hashedPassword = await scryptPromisify(password, crypto_secret_key, 16)
  return this.password === hashedPassword.toString('hex')
}

const User = model('User', userSchema)

module.exports = User
