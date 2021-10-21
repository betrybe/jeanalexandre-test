class AssertionError {
  constructor(message) {
    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = AssertionError;