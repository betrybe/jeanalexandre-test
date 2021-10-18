const NewUser = require('../domain/User/NewUser');

class Users {
  constructor(repository) {
    this.repository = repository;
    this.useCase = new NewUser(repository);
  }

  async newUser(req, res) {
    const { name, email, password, role } = req.body;
    const newId = this.repository.nextId();
    
    const user = await this.useCase.create(newId, { name, email, password, role });

    return res.status(201).json({ user });    
  }
}

module.exports = Users;