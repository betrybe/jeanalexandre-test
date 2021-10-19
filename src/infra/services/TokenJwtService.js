const jwt = require('jsonwebtoken');
const AuthorizationError = require('../../domain/common/AuthorizationError');

class TokenJwtService {
  constructor() {
    this.SECRET = '1af6541a45ads0';
  }

  extract(token) {
    if (!token) throw new AuthorizationError('jwt malformed');

    return jwt.verify(token, this.SECRET, (err, decoded) => {
      if (err) throw new AuthorizationError('jwt malformed');

      return {
        id: decoded.id,
        email: decoded.email,
      };
    });
  }

  generate({ id, email }) {
    return jwt.sign({ id, email }, this.SECRET, { expiresIn: '30m' });
  }
}

module.exports = TokenJwtService;