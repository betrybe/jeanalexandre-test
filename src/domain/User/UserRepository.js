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
  
  nextId() {
    return this.strategy.nextId();
  } 

  save(usuario) {
    this.strategy.save(usuario);
  }
  
  findByEmail(email) {
    return this.strategy.findByEmail(email);
  }
}

module.exports = UserRepository;
