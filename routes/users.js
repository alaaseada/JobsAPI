const express = require('express')
const Router = express.Router()
const {
  login,
  register,
  changePassword,
  deleteAccount,
} = require('../controllers/users')

Router.post('/login', login)
Router.post('/register', register)
Router.route('/:_id').patch(changePassword).delete(deleteAccount)

module.exports = Router
