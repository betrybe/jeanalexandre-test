const NewUser = require('../domain/User/NewUser');
const ForbiddenError = require('../domain/common/ForbiddenError');

class Users {
  constructor(repository, tokenService) {
    this.repository = repository;
    this.tokenService = tokenService;
    this.useCase = new NewUser(repository);
  }

  async newUser(req, res) {
    const { name, email, password } = req.body;
    const newId = this.repository.nextId();
    
    const newUser = await this.useCase.create(newId, { name, email, password });
    const user = newUser.toJson();
    delete user.password;

    return res.status(201).json({ user });    
  }

  async newAdminUser(req, res) {
    const token = req.get('Authorization') || req.headers.authorization;
    
    await this.onlyAdmin(token);

    const { name, email, password } = req.body;
    const newId = this.repository.nextId();
    
    const newUser = await this.useCase.create(newId, { name, email, password, role: 'admin' });
    
    const user = newUser.toJson();
    delete user.password;

    return res.status(201).json({ user });    
  }

  async onlyAdmin(token) {
    const { id: userId } = this.tokenService.extract(token);    
    const userFound = await this.repository.findById(userId);
    
    if (userFound.role !== 'admin') {
      throw new ForbiddenError('Only admins can register new admins');
    }
  }
}

module.exports = Users;