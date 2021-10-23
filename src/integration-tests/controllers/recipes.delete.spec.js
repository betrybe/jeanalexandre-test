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
	
	describe("DELETE /recipes/:id", () => {
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
		
		it("204 Deve remover receita com sucesso!", async () => {

			const { status, body } = await chai
				.request(app)
				.delete(`/recipes/${_id}`)
				.set("Authorization", token);				

			expect(status).to.eql(204);
			expect(body).to.be.empty;
		});
	});
});