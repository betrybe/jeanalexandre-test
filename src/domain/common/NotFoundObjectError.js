class NotFoundObjectError {
  constructor(message) {
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = NotFoundObjectError;