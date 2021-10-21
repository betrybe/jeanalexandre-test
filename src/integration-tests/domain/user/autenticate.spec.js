const { expect } = require('chai');
const Autenticate = require('../../../domain/User/Autenticate');
const MemUserRepository = require('../MemUserRepository');
const MockTokenService = require('../MockTokenService');

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
			console.log(token);
			expect(token).to.eql(`1-${tokenService.SECRET}-${email}`);
		});		
	});
});