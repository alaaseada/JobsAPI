const mongoose = require('mongoose')
require('dotenv').config()

const connectToDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTIONSTRING)
}

module.exports = connectToDB
