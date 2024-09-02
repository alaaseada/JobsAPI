const express = require('express')
const Router = express.Router()
const {
  authenticateUser,
  getAllJobs,
  getOneJob,
  insertJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs')

Router.route('/').get(getAllJobs).post(insertJob)
Router.route('/:_id').get(getOneJob).patch(updateJob).delete(deleteJob)

module.exports = Router
