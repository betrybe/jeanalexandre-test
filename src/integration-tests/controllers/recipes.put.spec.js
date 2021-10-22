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
	
	describe("PUT /recipes/:id", () => {
		const userId = new ObjectID();
		const _id = new ObjectID();
		let token;
		
		beforeEach(async () => {
			await collection.deleteMany({});
			const tokenService = new TokenJwtService();
			const email = "pandora@email.com";

			token = tokenService.generate({ id: userId.toString(), email });
			
			await collection.insert({
				_id,
				name: "Batida de morango",
				ingredients: "Morango, pinga e gelo",
				preparation: "colocar tudo no liquidificador e bater.",
				userId
			});
		});
		
		it("200 Deve alterar nova receita com sucesso!", async () => {
			const name = "Poção da invisibilidade";
			const ingredients = "1 Fada, 2 pelos de macaco, ...";
			const preparation = "coloque a fada no caldeirão junto aos pelos...";

			const { status, body } = await chai
				.request(app)
				.put(`/recipes/${_id}`)
				.set("Authorization", token)
				.send({				
					name,
					ingredients, 
					preparation
				});

			expect(status).to.eql(200);

			expect(body.name).to.eq(name);
			expect(body.ingredients).to.eq(ingredients);
			expect(body.preparation).to.eq(preparation);
			expect(body.userId).to.eq(userId.toString());
			
			const recipeSaved = await collection.findOne({ _id: ObjectID(body._id) });
			expect(recipeSaved.name).to.eq(name);
			expect(recipeSaved.ingredients).to.eq(ingredients);
			expect(recipeSaved.preparation).to.eq(preparation);
			expect(recipeSaved.userId.toString()).to.eq(userId.toString());			
		});
	});
});