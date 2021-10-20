const NewRecipe = require('../domain/Recipe/NewRecipe');

class Recipes {
  constructor(repository, tokenService) {
    this.repository = repository;
    this.useCase = new NewRecipe(repository);
    this.tokenService = tokenService;
  }

  async newRecipe(req, res) {
    const token = req.get('Authorization') || req.headers.authorization;
    const { id: userId } = this.tokenService.extract(token);
    const { name, ingredients, preparation } = req.body;
    
    const recipeId = this.repository.nextId();

    const recipe = await this.useCase.create(recipeId, { name, ingredients, preparation, userId });

    return res.status(201).json({ recipe });
  }

  async editRecipe(req, res) {
    const token = req.get('Authorization') || req.headers.authorization;
    const { id: userId } = this.tokenService.extract(token);
    //TODO validar userId com recipeFound.userId;
    //TODO apenas usuarios admin podem remover
    
    const { id: recipeId } = req.params;
    const { name, ingredients, preparation } = req.body;
    
    const recipeFound = await this.repository.findById(recipeId);
    recipeFound.name = name;
    recipeFound.ingredients = ingredients;
    recipeFound.preparation = preparation;
    
    const recipe = recipeFound.toJson();
    await this.repository.save(recipe);

    return res.status(200).json(recipe);
  }

  async deleteRecipe(req, res) {
    const token = req.get('Authorization') || req.headers.authorization;
    const { id: userId } = this.tokenService.extract(token);
    //TODO validar userId com recipeFound.userId;
    //TODO apenas usuarios admin podem remover
    const { id: recipeId } = req.params;

    await this.repository.deleteById(recipeId);

    return res.sendStatus(204);
  }

  async getOne(req, res) {
    const { id } = req.params;
    
    const item = await this.repository.findById(id);  
    return res.json(item);  
  }

  async listAll(req, res) {
    const list = await this.repository.findAll();
    return res.json(list);
  }
}

module.exports = Recipes;