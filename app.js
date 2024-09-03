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
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
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
app.get('/', (req, res) => {
  return res.send(
    '<h1>Welcome to our JobsAPI</h1><a href="/api-docs">Documentation</a>'
  )
})
app.use('/api/v1/jobs', AuthenticationMiddleware, jobs_router)
app.use('/api/v1/auth', users_router)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(NotFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const start = async () => {
  try {
    await connectToDB()
    console.log('Successfully connected to the DB...')
    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.error(error.message)
  }
}

start()
