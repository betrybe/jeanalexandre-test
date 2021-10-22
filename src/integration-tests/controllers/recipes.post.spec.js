const chai = require('chai');
const http = require('chai-http');
const { ObjectID } = require('mongodb');
const TokenJwtService = require('../../infra/services/TokenJwtService');
const db = require('../../infra/db');
const app = require('../../api/app');

chai.use(http);
const { expect } = chai;

describe("Routes: Recipes", () => {
	let collection;
	before(async () => {
		await db().then(client => collection = client.collection('recipes')); 
	});
	
	describe("POST /recipes", () => {
		const userId = new ObjectID();
		let token;
		
		beforeEach(async () => {
			await collection.deleteMany({});
			const tokenService = new TokenJwtService();
			const email = "pandora@email.com";

			await collection.insert({
				name: "pandora",
				email,
				role: "user",
				password: "123123" 
			});

			token = tokenService.generate({ id: userId.toString(), email });
		});
		
		it("201 Deve criar nova receita com sucesso!", async () => {
			const name = "Poção da invisibilidade";
			const ingredients = "1 Fada, 2 pelos de macaco, ...";
			const preparation = "coloque a fada no caldeirão junto aos pelos...";

			const { status, body } = await chai
				.request(app)
				.post("/recipes")
				.set("Authorization", token)
				.send({				
					name,
					ingredients, 
					preparation
				});

			expect(status).to.eql(201);
			const { recipe } = body;
			expect(recipe.name).to.eq(name);
			expect(recipe.ingredients).to.eq(ingredients);
			expect(recipe.preparation).to.eq(preparation);
			expect(recipe.userId).to.eq(userId.toString());
			
			const recipeSaved = await collection.findOne({ _id: ObjectID(recipe._id) });
			expect(recipeSaved.name).to.eq(name);
			expect(recipeSaved.ingredients).to.eq(ingredients);
			expect(recipeSaved.preparation).to.eq(preparation);
			expect(recipeSaved.userId).to.eq(userId.toString());			
		});
	});
});