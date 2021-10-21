const Recipe = require('../../domain/Recipe/Recipe');

class MemRecipeRepository {
	constructor() {
		this.recipes = [];
		this.aNextId = 1;
	}

	nextId() {
		return this.aNextId++;
	}

	save(recipe) {
		const { _id, name, ingredients, preparation, userId } = recipe;
		this.recipes.push({ 
			_id,
			name,
			ingredients,
			preparation,
			userId
		});
	}

	findById(id) {
		const [ recipeFound ] = this.recipes.filter(recipe => recipe._id === id);
		if (!recipeFound) return null;
    return Recipe.fromJson({ ...recipeFound });
	}
}

module.exports = MemRecipeRepository;