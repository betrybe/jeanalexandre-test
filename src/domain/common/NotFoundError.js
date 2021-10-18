export default class NotFoundError extends Error {
  constructor(message = {}) {
    super(message.detail);
    this._errorMessage = message;
    this.name = 'NotFoundError';
  }

  errorMessage() {
    return this._errorMessage;
  }
  
  get message() {
    return this._errorMessage;
  }
}