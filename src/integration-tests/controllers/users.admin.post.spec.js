const chai = require('chai');
const http = require('chai-http');
const { ObjectID } = require('mongodb');
const TokenJwtService = require('../../infra/services/TokenJwtService');
const db = require('../../infra/db');
const app = require('../../api/app');


chai.use(http);
const { expect } = chai;

describe("Routes: Users", () => {
	let collection;	
	before(async () => {
		await db().then(client => collection = client.collection('users')); 
	});
	
	describe("POST /users/admin", () => {
		let token;
		beforeEach(async () => {
			await collection.deleteMany({});
			const tokenService = new TokenJwtService();
			
			const id = new ObjectID();
			const email = "zeus@email.com";
			await collection.insert({
				_id: id,
				name: "zeus",
				email,
				role: "admin",
				password: "123456" 
			});

			token = tokenService.generate({ id, email });
		});
		
		it("201 Deve criar novo usuário admin com sucesso!", async () => {
			const name = "posseidon";
			const email = "posseidon@email.com";
			const password = "oceano";
			const role = "admin";

			const { status, body } = await chai
				.request(app)
				.post("/users/admin")
				.set("Authorization", token)
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

		it("403 Não deve permitir adicionar usuário sem token!", async () => {
			const { status, body } = await chai
				.request(app)
				.post("/users/admin")
				.send({				
					name: "baco",
					email: "baco@email.com", 
					password: "123123"
				});

			expect(status).to.eql(401);
			const { message } = body;
			expect(message).to.eql('missing auth token');	
		});
	});

	describe("POST /users/admin", () => {
		let token;
		beforeEach(async () => {
			await collection.deleteMany({});
			const tokenService = new TokenJwtService();
			
			const id = new ObjectID();
			const email = "hera@email.com";
			await collection.insert({
				_id: id,
				name: "hera",
				email,
				role: "user",
				password: "123123" 
			});

			token = tokenService.generate({ id, email })
		});
		
		it("403 Não deve permitir inserir usuários não admin com sucesso!", async () => {
			const { status, body } = await chai
				.request(app)
				.post("/users/admin")
				.set("Authorization", token)
				.send({				
					name: "athena",
					email: "athena@email.com", 
					password: "justica"
				});

			expect(status).to.eql(403);			
			const { message } = body;
			expect(message).to.eql('Only admins can register new admins');					
		});
	});
});