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
  
  findByEmail(email) {
    return this.strategy.findByEmail(email);
  }
}

module.exports = UserRepository;
