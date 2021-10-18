class TokenService {
  constructor() {
    this.aStrategy = null;
  }

  set strategy(strategy) {
    this.aStrategy = strategy;
  }

  get strategy() {
    return this.aStrategy;
  }

  generate(data) {
    return this.strategy.generate(data);
  }
}

module.exports = TokenService;