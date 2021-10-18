const NewUser = require('../domain/User/NewUser');

class Users {
  constructor(repository) {
    this.repository = repository;
    this.useCase = new NewUser(repository);
  }

  newUser(req, res) {
    const { name, email, password } = req.body;

    const newId = this.repository.nextId();
      
    const user = this.useCase.create(newId, { name, email, password });

    return res.status(201)
      .json({ user });
  }
}

module.exports = Users;