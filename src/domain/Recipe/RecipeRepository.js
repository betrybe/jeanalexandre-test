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

  findById(id) {
    return this.strategy.findById(id);
  }
}

module.exports = RecipeRepository;
