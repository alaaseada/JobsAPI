require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss_clean = require('xss-clean')
const rateLimit = require('express-rate-limit')
require('express-async-errors')
const { jobs_router, users_router } = require('./routes')
const connectToDB = require('./db/connect')
const {
  NotFoundMiddleware,
  ErrorHandlerMiddleware,
  AuthenticationMiddleware,
} = require('./middleware')

const app = express()

app.set('trust proxy', 1)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(xss_clean())
app.use(limiter)
app.use('/api/v1/jobs', AuthenticationMiddleware, jobs_router)
app.use('/api/v1/auth', users_router)
app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const start = async () => {
  try {
    await connectToDB()
  } catch (error) {
    console.error(error.message)
  }
}

start()


export const handler = serverless(app)
