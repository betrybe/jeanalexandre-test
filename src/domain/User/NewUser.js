const User = require('./User');
const UserRepository = require('./UserRepository');
const Assertion = require('../common/Assertion');

class NewUser {
  constructor(repository) {
    this.repository = new UserRepository();
    this.repository.strategy = repository;
  }
  
  async create(newId, { name, email, password, role }) {
    await this.validDuplicatedEmail(email);

    const user = new User({
      id: newId,
      name,
      email,
      password,
      role,
    });
      
    await this.repository.save(user.toJson());
    
    return user;
  }

  async validDuplicatedEmail(email) {
    const user = await this.repository.findByEmail(email);
    Assertion.assertIsNullDuplicated(user, 'Email already registered');   
  }
}

module.exports = NewUser;