class NegocioError extends Error {

  constructor(message = { detail: '' }) {
    super(message.detail);
		this._errorMessage = message;
		this.name = "NegocioError";
	}

	errorMessage() {
		return this._errorMessage;
	}
}

module.exports = NegocioError;