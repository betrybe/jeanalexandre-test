const { expect } = require('chai');
const RecipeRepository = require('../../../domain/Recipe/RecipeRepository');
const MemRecipeRepository = require('../MemRecipeRepository');
const Recipe = require('../../../domain/Recipe/Recipe');

describe("Domain: RecipeRepository", () => {
	let repository;

	before(() => {
		repository = new RecipeRepository();
		repository.strategy = new MemRecipeRepository();
	});

	describe("nextId()", () => {
		it("Deve obter próximo id com sucesso!", () => {
			const firstId = repository.nextId();
			expect(firstId).to.eql(1);

			const secId = repository.nextId();
			expect(secId).to.eql(2);			
		});
	})
	
	describe("save()", () => {
		it("Deve salvar receita com sucesso!", () => {
			
			const newRecipe = new Recipe({ 
				id: "xadf", 
				name: "Receita",
				ingredients: "informação",
				preparation: "forma de preparação",
				userId: "45"
			});

			repository.save(newRecipe.toJson());
			
			expect(repository.strategy.recipes).to.be.an('array').to.have.lengthOf(1);
		});
	});

	describe("findById()", () => {
		it("Deve obter uma receita por id com sucesso!", () => {
			
			const newRecipe = new Recipe({ 
				id: "aafds", 
				name: "Nova receita",
				ingredients: "ingredientes",
				preparation: "forma de preparação",
				userId: "abc"
			});

			repository.save(newRecipe.toJson());
			
			const recipe = repository.findById("aafds");

			expect(recipe.id).to.eql("aafds");
			expect(recipe.name).to.eql("Nova receita");
			expect(recipe.ingredients).to.eql("ingredientes");
			expect(recipe.preparation).to.eql("forma de preparação");
			expect(recipe.userId).to.eql("abc");
		});
	});
});