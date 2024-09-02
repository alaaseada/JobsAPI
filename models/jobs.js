const { Schema, model } = require('mongoose')
const job_status = ['interview', 'pending', 'rejected']

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: [true, 'Job position is required'],
      maxLength: [50, 'Position cannot exceed 50 characters'],
      trim: true,
      lowerCase: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      maxLength: [50, 'Company name cannot exceed 50 characters'],
      trim: true,
      lowerCase: true,
    },
    status: {
      type: String,
      enum: {
        values: job_status,
        message: `{VALUE} is not in ${job_status}`,
      },
      default: 'pending',
      trim: true,
      lowerCase: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

jobSchema.pre('findOneAndUpdate', function (next) {
  this.status = this.status.toLowerCase()
  return next()
})

const Job = model('Job', jobSchema)
module.exports = Job
