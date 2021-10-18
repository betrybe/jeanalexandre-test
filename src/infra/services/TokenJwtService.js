const jwt = require('jsonwebtoken');

const SECRET = '1af6541a45ads0';

class TokenJwtService {
  extract(token) {
    return jwt.verify(token, SECRET, (err, decoded) => {
      if(err) return null;

      return {
        id : decoded.id,
        email: decoded.email
      };

    });
  }

  generate({ id, email }) {
    return jwt.sign({ id, email }, SECRET, { expiresIn: '30m' });
  }
}

module.exports = TokenJwtService;