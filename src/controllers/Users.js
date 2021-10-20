const NewUser = require('../domain/User/NewUser');

class Users {
  constructor(repository, tokenService) {
    this.repository = repository;
    this.useCase = new NewUser(repository, tokenService);
  }

  async newUser(req, res) {
    const { name, email, password, role } = req.body;
    const newId = this.repository.nextId();
    
    const newUser = await this.useCase.create(newId, { name, email, password, role });
    const user = newUser.toJson();
    delete user.password;

    return res.status(201).json({ user });    
  }
}

module.exports = Users;