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
		/*
		it("201 Deve criar novo usuário com passaporte corretamente!", async () => {

			before(async () => {
				await MongoUsuario.deleteMany({ });	
			});

			const { body: usuario } = await request(app)
				.post("/usuarios-papel")
				.set("Authorization", token)
				.send({				
					nome: "Teste2", 
					nomeUsuario: "teste2",
					cpf: "11111111111",
					formaAutenticacao: "interno",
					senha: "123456",
					passaportes: ["administrador"]				
				})
				.expect(201);
						
			expect(usuario.id).to.not.be.null;
			expect(usuario.obter).to.eql(`/usuarios/${usuario.id}`);	

			const { passaportes, ativo, cpf, dominio, formaAutenticacao, historico } = await MongoUsuario.findOne({ nomeUsuario: "teste2" });
			expect(ativo).to.be.false;
			expect(cpf).to.eql("11111111111");
			expect(dominio).to.eql("@interno");
			expect(formaAutenticacao).to.eql("interno");
			expect(historico).to.be.an("array").to.have.lengthOf(1);
			expect(historico[0].informacao).to.eql("Criação do usuário");
			expect(historico[0].admin.login).to.eql("jeandobre");
			expect(passaportes).to.be.an("array").to.have.lengthOf(1);
			expect(passaportes[0].nome).to.eql("administrador");
		});
		
		it("412 Deve falhar ao forma de autenticação inválida!", async () => {

			const { body } = await request(app)
				.post("/usuarios-papel")
				.set("Authorization", token)
				.send({				
					nome: "Teste3", 
					nomeUsuario: "teste3",
					cpf: "11111111111",
					dominio: "@mock",
					formaAutenticacao: "mock",
					passaportes: ["qualquer"]				
				})
				.expect(412);

			const { errors } = body;			
			expect(errors[0].detail).to.eql("A forma de autenticação informada não é válido!");
			expect(errors[0].source).to.eql("formaAutenticacao");
		});

		it("412 Deve falhar ao criar novo usuário com passaporte inválido!", async () => {

			const { body } = await request(app)
				.post("/usuarios-papel")
				.set("Authorization", token)
				.send({				
					nome: "Teste3", 
					nomeUsuario: "teste3",
					cpf: "11111111111",
					dominio: "@interno",
					senha: "123456",
					formaAutenticacao: "interno",
					passaportes: ["qualquer"]				
				})
				.expect(412);

			const { errors } = body;			

			expect(errors[0].detail).to.eql("O passaporte 'qualquer' não está registrado em nenhuma api!");
			expect(errors[0].source).to.eql("passaporte");
		});
			
		it("412 Deve dar erro em campos obrigatórios!", async () => {

			const { body } = await request(app)
				.post("/usuarios")
				.set("Authorization", token)
				.send({
					nomeUsuario: ""
				})
				.expect(412);

			const { errors } = body;

			expect(errors).to.be.an("array").to.have.lengthOf(4);
			expect(errors[0].detail).to.eql("O nome é obrigatório!");
			expect(errors[0].source).to.eql("nome");

			expect(errors[1].detail).to.eql("O nomeUsuario é obrigatório!");
			expect(errors[1].source).to.eql("nomeUsuario");

			expect(errors[2].detail).to.eql("O cpf é obrigatório!");
			expect(errors[2].source).to.eql("cpf");

			expect(errors[3].detail).to.eql("A forma de autenticação é obrigatória!");
			expect(errors[3].source).to.eql("formaAutenticacao");
		});
		
		it("412 Deve dar erro de tamanho do cpf!", async () => {

			const { body } = await request(app)
				.post("/usuarios")
				.set("Authorization", token)
				.send({
					nome: "Teste", 
					nomeUsuario: "teste",
					cpf: "111111111111",
					dominio: "@interno",
					formaAutenticacao: "interno"				
				})
				.expect(412);
			
			const { errors } = body;
			expect(errors).to.be.an("array").to.have.lengthOf(1);
			expect(errors[0].detail).to.eql("O cpf é inválido! Padrão válido: 12345678900");
			expect(errors[0].source).to.eql("cpf");
		});
		
		it("412 Deve validar login duplicado!", async () => {

			const data = {
				nome: "Teste", 
				nomeUsuario: "teste",
				cpf: "11111111111",
				dominio: "@interno",
				senha: "123456",
				formaAutenticacao: "interno"
			};
			
			await MongoUsuario.create(data);

			const { body } = await request(app)
				.post("/usuarios")
				.set("Authorization", token)
				.send(data)
				.expect(412);
			
			const { errors } = body;

			expect(errors).to.be.an("array").to.have.lengthOf(1);

			expect(errors[0].detail).to.eql("O nome de usuário teste já está registrado, não pode ser duplicado!");
			expect(errors[0].source).to.eql("nomeUsuario");
		});*/
	});
});