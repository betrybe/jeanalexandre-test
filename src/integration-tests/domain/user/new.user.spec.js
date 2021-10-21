const { expect } = require('chai');
const NewUser = require('../../../domain/User/NewUser');
const MemUserRepository = require('../MemUserRepository');

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
	});
});