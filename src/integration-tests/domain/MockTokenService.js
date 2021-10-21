const AuthorizationError = require('../../domain/common/AuthorizationError');

class MockTokenService {
  constructor() {
    this.SECRET = 'abracadabra';
  }

  extract(token) {
    if (!token) throw new AuthorizationError('missing auth token');

		const [id, secret, email] = token;

		if(!id || !secret || !email)
			if (err) throw new AuthorizationError('jwt malformed');
		
		if(secret !== this.SECRET)
			if (err) throw new AuthorizationError('jwt malformed');

    return {
      id,
      email,    
    };
  }

  generate({ id, email }) {
    return `${id}-${this.SECRET}-${email}`;
  }
}

module.exports = MockTokenService;