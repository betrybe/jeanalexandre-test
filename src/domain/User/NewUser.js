const User = require('./User');
const UserRepository = require('./UserRepository');
const Assertion = require('../common/Assertion');

class NewUser {
  constructor(repository) {
    this.assertion = new Assertion();
    this.repository = new UserRepository();
    this.repository.strategy = repository;
  }
  
  async create(newId, { 
    name,
    email,
    password,
  }) {
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
   /* const UserComMesmoLogin = await this._repository.buscarPorLogin(nameUser);
    this._assertion.assertFalse(UserComMesmoLogin, 
      `O name de usuário ${nameUser} já está registrado, não pode ser duplicado!`,
      'nameUser');   
		*/ 
  }
}

module.exports = NewUser;