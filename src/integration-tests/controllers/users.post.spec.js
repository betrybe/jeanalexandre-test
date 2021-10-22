const chai = require('chai');
const http = require('chai-http');
const { ObjectID } = require('mongodb');
const db = require('../../infra/db');
const app = require('../../api/app');

chai.use(http);
const { expect } = chai;

describe("Routes: Users", () => {
	let collection;
	before(async () => {
		await db().then(client => collection = client.collection('users')); 
	});
	
	describe("POST /users", () => {
		
		beforeEach(async () => {
			await collection.deleteMany({});
		});
		
		it("201 Deve criar novo usuário com sucesso!", async () => {
			const name = "theia";
			const email = "theia@email.com";
			const password = "olimpo";
			const role = "user";

			const { status, body } = await chai
				.request(app)
				.post("/users")
				.send({				
					name,
					email, 
					password
				});

			expect(status).to.eql(201);
			const { user } = body;
			expect(user.name).to.eq(name);
			expect(user.email).to.eq(email);
			expect(user.role).to.eq(role);
			expect(user.password).to.be.undefined;
			
			const userSaved = await collection.findOne({ _id: ObjectID(user._id) });
			expect(userSaved.name).to.eq(name);
			expect(userSaved.email).to.eq(email);
			expect(userSaved.password).to.eq(password);
			expect(userSaved.role).to.eq(role);			
		});
	});
});