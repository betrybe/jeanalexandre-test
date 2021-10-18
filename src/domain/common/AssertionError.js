class AssertionError extends Error {

  constructor(message = { detail: '' }) {
    super(message.detail);
	}
	
}

module.exports = AssertionError;