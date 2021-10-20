const { expect } = require('chai');
const NewUser = require('../domain/User/NewUser');
const MemUserRepository = require('./MemUserRepository');

describe("Domain: NewUser", () => {
	const memRepository = new MemUserRepository();
	const userCase = new NewUser(memRepository);
	
	describe("create()", () => {		
		it("Deve criar novo usuario corretamente!", async () => {
			
			const newId = memRepository.nextId();

			const user = await userCase.create(newId, {
				name: "Jean Dobre",
				email: "jeandobre@gmail.com",
				password: "123456"
			});

			expect(memRepository.users).to.be.an('array').to.have.lengthOf(1);

			expect(user.id).to.eql(1);
			expect(user.name).to.eql("Jean Dobre");
			expect(user.email).to.eql("jeandobre@gmail.com");
			expect(user.password).to.eql("123456");
			expect(user.role).to.eql("user");
		});
		/*
		it("Deve falhar ao criar usuario com login existente !", async () => {
			
			try {
				await novoUsuario.executar(1, {
					nome: "Teste", 
					nomeUsuario: "teste",
					cpf: "11111111111",
					dominio: "@mock",
					formaAutenticacao: "mock",
					ativo: false
				});
				expect.fail("Deveria ter falhado ao criar usuario com login dupliado.");
			
			} catch(error) {
				expect(error.message).to.eql("O nome de usuário teste já está registrado, não pode ser duplicado!");
			}
		});	
		*/
	});
});