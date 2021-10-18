class UserRepository {
  constructor() {
    this.aStrategy = null;
  }

  set strategy(strategy) {
    this.aStrategy = strategy;
  }

  get strategy() {
    return this.aStrategy;
  }
  
  save(usuario) {
    return this.strategy.save(usuario);
  }

  findById(id) {
    return this.strategy.findById(id);
  }

  findByEmail(login) {
    return this.strategy.findByEmail(login);
  }
}

module.exports = UserRepository;
