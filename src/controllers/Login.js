const Autenticate = require('../domain/User/Autenticate');

class Login {
  constructor(repository, tokenService) {
    this.repository = repository;
    this.useCase = new Autenticate(repository, tokenService);
  }

  async autenticate(req, res) {
    const { email, password } = req.body;

    const token = await this.useCase.execute({ email, password });

    return res.status(200).json({ token });
  }
}

module.exports = Login;