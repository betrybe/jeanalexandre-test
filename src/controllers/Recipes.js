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
    
    const newId = this.repository.nextId();

    const recipe = await this.useCase.create(newId, { name, ingredients, preparation, userId });

    return res.status(201).json({ recipe });
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