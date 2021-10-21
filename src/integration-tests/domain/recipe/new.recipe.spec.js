const { expect } = require('chai');
const NewRecipe = require('../../../domain/Recipe/NewRecipe');
const MemRecipeRepository = require('../MemRecipeRepository');

describe("Domain: NewRecipe", () => {
	const memRepository = new MemRecipeRepository();
	const useCase = new NewRecipe(memRepository);
	
	describe("create()", () => {		
		it("Deve criar nova receita corretamente!", async () => {
			
			const newId = memRepository.nextId();

			const user = await useCase.create(newId, {
				name: "Receita",
				ingredients: "informação",
				preparation: "forma de preparação",
				userId: "45"
			});

			expect(memRepository.recipes).to.be.an('array').to.have.lengthOf(1);

			expect(user.id).to.eql(newId);
			expect(user.name).to.eql("Receita");
			expect(user.ingredients).to.eql("informação");
			expect(user.preparation).to.eql("forma de preparação");
			expect(user.userId).to.eql("45");
		});		
	});
});