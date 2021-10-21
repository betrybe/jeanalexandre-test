class AuthorizationError {
  constructor(message) {
    this.message = message;
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;