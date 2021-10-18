const jwt = require('jsonwebtoken');

class TokenJwtService {
	generate({ email }) {
    return jwt.sign({ email }, 'segredo', { expiresIn: '30m' });
  }
}

module.exports = TokenJwtService;