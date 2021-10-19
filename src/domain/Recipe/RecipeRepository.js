class RecipeRepository {
  constructor() {
    this.aStrategy = null;
  }

  set strategy(strategy) {
    this.aStrategy = strategy;
  }

  get strategy() {
    return this.aStrategy;
  }
  
  save(recipe) {
    return this.strategy.save(recipe);
  }
}

module.exports = RecipeRepository;
