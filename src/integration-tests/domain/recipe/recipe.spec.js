const { expect } = require('chai');
const Recipe = require('../../../domain/Recipe/Recipe');
const AssertionError = require('../../../domain/common/AssertionError');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

describe("Domain: Recipe", () => {
	describe("toJson()", () => {
		it("Deve criar recipe com sucesso!", () => {
			const id = 1;
			const name = "Churrasco";
			const ingredients = "Picanha, carvão, churrasqueira e sal grosso";
			const preparation = "Sal na picanha, fogo no carvão e churrasqueira.";
			const userId = 1;

			const recipe = new Recipe({
				id,
				name,
				ingredients,
				preparation,
				userId
			});	

			const recipeJson = recipe.toJson();
							
			expect(recipeJson._id).to.eql(id);
			expect(recipeJson.name).to.eql(name);
			expect(recipeJson.ingredients).to.eql(ingredients);
			expect(recipeJson.preparation).to.eql(preparation);
			expect(recipeJson.userId).to.eql(userId);	
		});
	});

	describe("constructor()", () => {
		it("Não deve deixar passar com id vazio!", () => {
			try {
				new Recipe({
					name: "Teste"
				});
				expect.fail("Deveria dar erro de id vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});

		it("Não deve deixar passar com nome vazio!", () => {
			try {
				new Recipe({
					id: "122121"				
				});
				expect.fail("Deveria dar erro de nome vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});

		it("Não deve deixar passar com ingredientes vazio!", () => {
			try {
				new Recipe({
					id: "122121",
					name: "Outra receita"
				});
				expect.fail("Deveria dar erro de ingredientes vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});
	
		it("Não deve deixar passar com preparação vazia!", () => {
			try {
				new Recipe({
					id: "122121",
					name: "Outra receita",
					ingredients: "Farinha, milho, ....",
				});
				expect.fail("Deveria dar erro de preparação vazia!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});

		it("Não deve deixar passar com userId vazio!", () => {
			try {
				new Recipe({
					id: "122121",
					name: "Outra receita",
					ingredients: "Farinha, milho, ....",
					preparation: "Bata a farinha e o milho por..."
				});
				expect.fail("Deveria dar erro de userId vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});
	});

	describe("fromJson()", () => {
		it("Deve construir recipe corretamente!", () => {

				const recipe = Recipe.fromJson({
					_id: "1547",
					name: "Receita 1",
					ingredients: "Batata, farinha, ...",
					preparation: "Rale a batata e coloque na farinha por 5 minutos",
					userId: "15"
				});

				expect(recipe.id).to.eql("1547");
				expect(recipe.name).to.eql("Receita 1");
				expect(recipe.ingredients).to.eql("Batata, farinha, ...");
				expect(recipe.preparation).to.eql("Rale a batata e coloque na farinha por 5 minutos");
				expect(recipe.userId).to.eql("15");
		});
	});
});