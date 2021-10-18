const Recipe = require('./Recipe');
const RecipeRepository = require('./RecipeRepository');
const Assertion = require('../common/Assertion');

class NewRecipe {
  constructor(repository) {
    this.assertion = new Assertion();
    this.repository = new RecipeRepository();
    this.repository.strategy = repository;
  }
  
  async create(newId, { name, ingredients, preparation, userId }) {
    
    const recipe = new Recipe({
      id: newId,
      name,
      ingredients,
      preparation,
      userId,
    });
      
    const recipeSaved = await this.repository.save(recipe.toJson());
    return recipeSaved;
  }
}

module.exports = NewRecipe;