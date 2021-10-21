const UsuarioRepository = require('./UserRepository');
const Assertion = require('../common/Assertion');
const TokenService = require('./TokenService');
const AuthorizationError = require('../common/AuthorizationError');

const USER_NOT_FOUND_MESSAGE = 'Incorrect username or password';
const FIELD_NOT_FILLED_MESSAGE = 'All fields must be filled';

class Autenticate {  
  constructor(usuarioRepository, tokenService) {
    this.repository = new UsuarioRepository();
    this.repository.strategy = usuarioRepository;

    this.tokenService = new TokenService();
    this.tokenService.strategy = tokenService;
  }

  async execute({ email, password }) {
    try {
      Assertion.assertNotNull(email, FIELD_NOT_FILLED_MESSAGE);
      Assertion.assertNotNull(password, FIELD_NOT_FILLED_MESSAGE);
    
      const user = await this.repository.findByEmail(email);
      Assertion.assertTrue(user, USER_NOT_FOUND_MESSAGE);
      
      Assertion.assertEquals(user.password, password, USER_NOT_FOUND_MESSAGE);
      
      return this.tokenService.generate({ id: user.id, email });
    } catch (err) {
      throw new AuthorizationError(err.message);
    }
  }
}

module.exports = Autenticate;