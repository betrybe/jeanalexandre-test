const { expect } = require('chai');
const Autenticate = require('../../../domain/User/Autenticate');
const MemUserRepository = require('../MemUserRepository');
const MockTokenService = require('../../infra/MockTokenService');
const AuthorizationError = require('../../../domain/common/AuthorizationError');

describe("Domain: Autenticate", () => {
	const memRepository = new MemUserRepository();
	const tokenService = new MockTokenService();
	const useCase = new Autenticate(memRepository, tokenService);
	
	before(() => {
		memRepository.save({
			_id: "1",
			name: "Jean Dobre",
			email: "jeandobre@gmail.com",
			password: "123456",
			role: "user"
		});
	});

	describe("execute()", () => {
		it("Deve autorizar usuário com sucesso!", async () => {
			const email = "jeandobre@gmail.com";
			const password = "123456";
			const token = await useCase.execute({ email, password });
			expect(token).to.eql(`1-${tokenService.SECRET}-${email}`);
		});
		
		it("Não deve autorizar usuário com senha incorreta!", async () => {
			const email = "jeandobre@gmail.com";
			const password = "incorreta";
			try {
				await useCase.execute({ email, password });
				expect.fail("Deveria atirar erro de senha incorreta");
			} catch(err) {
				expect(err).instanceOf(AuthorizationError);
				expect(err.message).to.eql("Incorrect username or password");
			}
		});

		it("Não deve autorizar usuário com email incorreto!", async () => {
			const email = "fulanodetal@gmail.com";
			const password = "123456";
			try {
				await useCase.execute({ email, password });
				expect.fail("Deveria atirar erro de email incorreto");
			} catch(err) {
				expect(err).instanceOf(AuthorizationError);
				expect(err.message).to.eql("Incorrect username or password");
			}
		});
	});
});