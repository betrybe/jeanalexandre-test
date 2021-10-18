const NewRecipe = require('../domain/Recipe/NewRecipe');

class Recipes {
  constructor(repository, tokenService) {
    this.repository = repository;
    this.useCase = new NewRecipe(repository);
    this.tokenService = tokenService;
  }

  async newRecipe(req, res) {
    const { name, ingredients, preparation } = req.body;
    const { token } = req.headers;
    const { id: userId } = this.tokenService.extract(token);

    const recipe = await this.useCase.create({ name, ingredients, preparation, userId });

    return res.status(201).json(recipe);
  }
}

module.exports = Recipes;