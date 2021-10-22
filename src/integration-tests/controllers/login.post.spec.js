const chai = require('chai');
const http = require('chai-http');
const { ObjectID } = require('mongodb');
const TokenJwtService = require('../../infra/services/TokenJwtService');
const db = require('../../infra/db');
const app = require('../../api/app');

chai.use(http);
const { expect } = chai;

describe("Routes: Login", () => {
	let collection;
	before(async () => {
		await db().then(client => collection = client.collection('users')); 
	});
	
	describe("POST /login", () => {
		const id = new ObjectID();
		
		beforeEach(async () => {
			await collection.deleteMany({});
			

			await collection.insert({
				_id: id,
				name: "apolo",
				email: "apolo@email.com",
				role: "user",
				password: "ilovetetis" 
			});
		});
		
		it("201 Deve criar novo usuário com sucesso!", async () => {
			const email = "apolo@email.com";
			const password = "ilovetetis";

			const { status, body } = await chai
				.request(app)
				.post("/login")
				.send({				
					email, 
					password
				});

			expect(status).to.eql(200);
			const { token } = body;

			const userLogged = new TokenJwtService().extract(token);
			expect(userLogged.id).to.eql(id.toString());
			expect(userLogged.email).to.eql(email);
		});
	});
});