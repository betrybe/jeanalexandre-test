const { expect } = require('chai');
const User = require('../domain/User/User');
const AssertionError = require('../domain/common/AssertionError');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

describe("Domain: User", () => {
	describe("toJson()", () => {
		it("Deve criar user com role com sucesso!", () => {
			const id = 1;
			const name = "jeandobre";
			const email = "jeandobre@gmail.com";
			const password = "123789";
			const role = 'admin';

			const user = new User({
				id,
				name,
				email,
				password,
				role
			});	

			const userJson = user.toJson();
							
			expect(userJson._id).to.eql(id);
			expect(userJson.name).to.eql(name);
			expect(userJson.email).to.eql(email);
			expect(userJson.role).to.eql(role);
			expect(userJson.password).to.eql(password);	
		});

		it("Deve criar user sem role (default) com sucesso!", () => {
			const id = 1;
			const name = "jeandobre";
			const email = "jeandobre@gmail.com";
			const password = "123789";

			const user = new User({
				id,
				name,
				email,
				password
			});	

			const userJson = user.toJson();
							
			expect(userJson._id).to.eql(id);
			expect(userJson.name).to.eql(name);
			expect(userJson.email).to.eql(email);
			expect(userJson.role).to.eql('user');
			expect(userJson.password).to.eql(password);	
		});
	});

	describe("constructor()", () => {
		it("Não deve deixar passar com id vazio!", () => {
			try {
				new User({
					name: "Teste"
				});
				expect.fail("Deveria dar erro de id vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});

		it("Não deve deixar passar com nome vazio!", () => {
			try {
				new User({
					id: "122121"				
				});
				expect.fail("Deveria dar erro de nome vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});

		it("Não deve deixar passar com email vazio!", () => {
			try {
				new User({
					id: "122121",
					name: "Matheus Peluchi"
				});
				expect.fail("Deveria dar erro de email vazio!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});
	
		it("Não deve deixar passar com senha nome vazia!", () => {
			try {
				new User({
					id: "122121",
					name: "Matheus Peluchi",
					email: "matheus@gmail.com",
				});
				expect.fail("Deveria dar erro de senha vazia!");
			} catch(error) {
				expect(error).instanceOf(AssertionError);
				expect(error.message).to.eql(NOT_NULL_MESSAGE);
			}
		});
	});

	describe("fromJson()", () => {
		it("Deve construir user corretamente!", () => {

				const user = User.fromJson({
					_id: "abacate",
					name: "Usuário de teste",
					email: "teste@teste.com",
					role: "user",
					password: "123456"
				});

				expect(user.id).to.eql("abacate");
				expect(user.name).to.eql("Usuário de teste");
				expect(user.email).to.eql("teste@teste.com");
				expect(user.password).to.eql("123456");
				expect(user.role).to.eql("user");
		});
	});
});