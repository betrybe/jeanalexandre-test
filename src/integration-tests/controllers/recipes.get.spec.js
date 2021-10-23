const chai = require('chai');
const http = require('chai-http');
const { ObjectID } = require('mongodb');
const db = require('../../infra/db');
const app = require('../../api/app');

chai.use(http);
const { expect } = chai;

describe("Routes: Recipes", () => {
	let collection;
	before(async () => {
		await db().then(client => collection = client.collection('recipes')); 
	});
	
	describe("GET /recipes/:id", () => {
		const _id = new ObjectID();
		const userId = new ObjectID();

		const recipe1 = {
			_id,
			name: "Batida de morango",
			ingredients: "Morango, pinga e gelo",
			preparation: "colocar tudo no liquidificador e bater.",
			userId
		};

		const recipe2 = {
			name: "Poção da invisibilidade",
			ingredients: "1 Fada, 2 pelos de macaco, ...",
			preparation: "coloque a fada no caldeirão junto aos pelos...",
			userId
		};

		beforeEach(async () => {
			await collection.deleteMany({});
		
			await collection.insertMany([recipe1, recipe2]);
		});
		
		it("200 Deve obter uma receita com sucesso!", async () => {
		
			const { status, body } = await chai
				.request(app)
				.get(`/recipes/${_id}`);

			expect(status).to.eql(200);

			expect(body._id).to.eq(_id.toString());
			expect(body.name).to.eq(recipe1.name);
			expect(body.ingredients).to.eq(recipe1.ingredients);
			expect(body.preparation).to.eq(recipe1.preparation);
			expect(body.userId).to.eq(recipe1.userId.toString());					
		});

		it("200 Deve obter a lista de receitas com sucesso!", async () => {
		
			const { status, body } = await chai
				.request(app)
				.get("/recipes");

			expect(status).to.eql(200);

			const [ item1, item2 ] = body;

			expect(item1._id).to.eq(_id.toString());
			expect(item1.name).to.eq(recipe1.name);
			expect(item1.ingredients).to.eq(recipe1.ingredients);
			expect(item1.preparation).to.eq(recipe1.preparation);
			expect(item1.userId).to.eq(recipe1.userId.toString());

			expect(item2.name).to.eq(recipe2.name);
			expect(item2.ingredients).to.eq(recipe2.ingredients);
			expect(item2.preparation).to.eq(recipe2.preparation);
			expect(item2.userId).to.eq(recipe2.userId.toString());					
		});
	});
});