const { expect } = require('chai');
const UserRepository = require('../domain/User/UserRepository');
const User = require('../domain/User/User');

class MemUserRepository {
	constructor() {
		this.users = [];
		this.aNextId = 1;
	}

	nextId() {
		return this.aNextId++;
	}

	save(usuario) {
		const { _id, name, email, password, role } = usuario;
		this.users.push({ 
			_id,
			name,
			email,
			password,
			role
		});
	}

	findByEmail(email) {
		const [ userFound ] = this.users.filter(user => user.email === email);
		if (!userFound) return null;
    return User.fromJson({ ...userFound });
	}
}

describe("Domain: UserRepository", () => {
	let repository;

	before(() => {
		repository = new UserRepository();
		repository.strategy = new MemUserRepository();
	});

	describe("nextId()", () => {
		it("Deve obter próximo id com sucesso!", () => {
			const firstId = repository.nextId();
			expect(firstId).to.eql(1);

			const secId = repository.nextId();
			expect(secId).to.eql(2);			
		});
	})
	
	describe("save()", () => {
		it("Deve salvar usuário com sucesso!", () => {
			
			const newUser = new User({ 
				id: "aafds", 
				name: "Novo usuário",
				email: "usuario@user.com",
				password: "123456"
			});

			repository.save(newUser.toJson());
			
			expect(repository.strategy.users).to.be.an('array').to.have.lengthOf(1);
		});
	});

	describe("findByEmail()", () => {
		it("Deve obter um usuário por email com sucesso!", () => {
			
			const newUser = new User({ 
				id: "aafds", 
				name: "Novo usuário",
				email: "usuario@user.com",
				password: "123456"
			});

			repository.save(newUser.toJson());
			
			const user = repository.findByEmail("usuario@user.com");

			expect(user.id).to.eql("aafds");
			expect(user.name).to.eql("Novo usuário");
			expect(user.email).to.eql("usuario@user.com");
			expect(user.password).to.eql("123456");
		});
	});
});