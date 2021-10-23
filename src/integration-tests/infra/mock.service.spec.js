const { expect } = require('chai');
const MockTokenService = require('./MockTokenService');

describe("Infra: MockService", () => {
	const service = new MockTokenService();
	
	describe("generate()", () => {		
		it("Deve gerar token corretamente!", async () => {
			const secrecy = service.SECRET;
			const id = "salada_mista";
			const email = "fulano@email.com";

			const token = service.generate({ id,	email	});

			expect(token).to.eql(`${id}-${secrecy}-${email}`)
		});		
	});

	describe("extract()", () => {	
		const id = "salada_mista";
		const email = "fulano@email.com";
		let token; 
		before(() => {
			token = service.generate({ id,	email	});
		});
		
		it("Deve extrair token corretamente!", async () => {
			const user = service.extract(token);
			expect(user.id).to.eq(id);
			expect(user.email).to.eq(email);
		});		

		it("Deve atirar erro de token incorreto!", async () => {
			try {
				service.extract(`id-banana-caju`);
				expect.fail("Deveria ocorrer erro de jwt malformed")
			} catch(err) {
				expect(err.statusCode).to.eql(401);
				expect(err.message).to.eql("jwt malformed");
			}	
		});	

		it("Deve atirar erro de token incorreto!", async () => {
			try {
				service.extract(`id-banana`);
				expect.fail("Deveria ocorrer erro de jwt malformed")
			} catch(err) {
				expect(err.statusCode).to.eql(401);
				expect(err.message).to.eql("jwt malformed");
			}	
		});

		it("Deve atirar erro de token faltando!", async () => {
			try {
				service.extract("");
				expect.fail("Deveria ocorrer erro de missing auth token")
			} catch(err) {
				expect(err.statusCode).to.eql(401);
				expect(err.message).to.eql("missing auth token");
			}	
		});
	});
});