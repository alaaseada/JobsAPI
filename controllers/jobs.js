const { StatusCodes } = require('http-status-codes')
const {
  BadRequestError,
  customAPIError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors')
const Job = require('../models/jobs')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ userId: req.userId }).sort('-createdAt')
  return res.status(StatusCodes.OK).json({ total: jobs.length, jobs })
}

const getOneJob = async (req, res) => {
  const { _id } = req.params
  const userId = req.userId
  const job = await Job.findOne({ _id, userId })
  if (!job) throw new NotFoundError(`Job with Id ${_id} is not found`)
  return res.status(StatusCodes.OK).json({ job })
}

const insertJob = async (req, res) => {
  const { company, position } = req.body
  if (!company || !position)
    throw new BadRequestError('Both position and company are required')
  const job = await Job.create({ userId: req.userId, ...req.body })
  return res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const { _id } = req.params
  const userId = req.userId
  const job = await Job.findOneAndUpdate({ _id, userId }, req.body, {
    runValidators: true,
    new: true,
  })
  if (!job) throw new NotFoundError(`Job with Id ${_id} is not found`)
  return res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const { _id } = req.params
  const userId = req.userId
  const job = await Job.findOneAndDelete({ _id, userId })
  if (!job) throw new NotFoundError(`Job with Id ${_id} is not found`)
  return res.status(StatusCodes.OK).json({ msg: 'success' })
}

module.exports = {
  getAllJobs,
  getOneJob,
  insertJob,
  updateJob,
  deleteJob,
}
