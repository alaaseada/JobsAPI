class customAPIError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

module.exports = customAPIError
