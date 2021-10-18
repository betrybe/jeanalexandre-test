const User = require('./User');
const UserRepository = require('./UserRepository');
const Assertion = require('../common/Assertion');

class NewUser {
  constructor(repository) {
    this.assertion = new Assertion();
    this.repository = new UserRepository();
    this.repository.strategy = repository;
  }
  
  async create(newId, { name, email, password }) {
    await this.validDuplicatedEmail(email);

    const user = new User({
      id: newId,
      name,
      email,
      password,
    });
      
    const userSaved = await this.repository.save(user.toJson());
    return userSaved;
  }

  async validDuplicatedEmail(email) {
    const user = await this.repository.findByEmail(email);
    this.assertion.assertIsNullDuplicated(user, 'Email already registered');   
  }
}

module.exports = NewUser;