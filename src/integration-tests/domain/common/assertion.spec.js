const { expect } = require('chai');
const Asssertion = require('../../../domain/common/Assertion');
const AssertionError = require('../../../domain/common/AssertionError');
const DuplicationError = require('../../../domain/common/DuplicationError');

describe("Domain: common", () => {	
	const assertion = new Asssertion();

	describe("assertEquals()", () => {		
		it("Comparação com sucesso!", async () => {
			assertion.assertEquals("Paquiderme", "Paquiderme", "String iguais!");
		});	
		
		it("Comparação com erro!", async () => {
			try {
				assertion.assertEquals("Paquiderme", "Rato", "String diferentes!");
				expect.fail("deveria ter falhado - assertEquals!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("String diferentes!");
			}
		});	
	});

	describe("assertNotEquals()", () => {		
		it("Comparação com sucesso!", async () => {
			assertion.assertNotEquals("Paquiderme", "Rato", "String diferentes!");
		});	
		
		it("Comparação com erro!", async () => {
			try {
				assertion.assertNotEquals("Paquiderme", "Paquiderme", "String iguais!");
				expect.fail("deveria ter falhado - assertNotEquals!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("String iguais!");
			}
		});	
	});

	describe("assertIsNullDuplicated()", () => {		
		it("Comparação com sucesso!", async () => {			
			assertion.assertIsNullDuplicated(null, "Objeto não duplicado!");
		});	
		
		it("Comparação com erro!", async () => {
			const obj = { name: "teste" };
			try {
				assertion.assertIsNullDuplicated(obj, "Objeto duplicado!");
				expect.fail("deveria ter falhado - assertIsNullDuplicated!");
			} catch(err) {
				expect(err).instanceOf(DuplicationError);
				expect(err.message).to.eql("Objeto duplicado!");
			}
		});	
	});

	describe("assertNotNull()", () => {		
		it("Comparação com sucesso!", async () => {	
			const obj = { name: "teste" };		
			assertion.assertNotNull(obj, "Objeto não nulo!");
		});	
		
		it("Comparação com erro!", async () => {
			let obj;
			try {
				assertion.assertNotNull(obj, "Objeto nulo!");
				expect.fail("deveria ter falhado - assertNotNull!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Objeto nulo!");
			}
		});	
	});

	describe("assertNull()", () => {		
		it("Comparação com sucesso!", async () => {	
			let obj;
			assertion.assertNull(obj, "Objeto nulo!");
		});	
		
		it("Comparação com erro!", async () => {
			
			const obj = { name: "teste" };	
			try {
				assertion.assertNull(obj, "Objeto não nulo!");
				expect.fail("deveria ter falhado - assertNull!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Objeto não nulo!");
			}
		});	
	});

	describe("assertTrue()", () => {		
		it("Comparação com sucesso!", async () => {	
			assertion.assertTrue(true, "Valor verdadeiro!");
		});	
		
		it("Comparação com erro!", async () => {
			
			try {
				assertion.assertTrue(false, "Valor falso!");
				expect.fail("deveria ter falhado - assertTrue!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Valor falso!");
			}
		});	
	});

	describe("assertFalse()", () => {		
		it("Comparação com sucesso!", async () => {	
			assertion.assertFalse(false, "Valor falso!");
		});	
		
		it("Comparação com erro!", async () => {
			
			try {
				assertion.assertFalse(true, "Valor verdadeiro!");
				expect.fail("deveria ter falhado - assertFalse!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Valor verdadeiro!");
			}
		});	
	});

	describe("assertNotEmpty()", () => {		
		it("Comparação com sucesso!", async () => {	
			const lista = [1,2,3];
			assertion.assertNotEmpty(lista, "Lista não vazia!");
		});	
		
		it("Comparação lista vazia!", async () => {
			
			try {
				assertion.assertNotEmpty([], "Lista vazia!");
				expect.fail("deveria ter falhado - assertNotEmpty!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Lista vazia!");
			}
		});	

		it("Comparação nulo!", async () => {
			let lista;
			try {
				assertion.assertNotEmpty(lista, "Objeto nulo!");
				expect.fail("deveria ter falhado - assertNotEmpty!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Objeto nulo!");
			}
		});	
	});

	describe("assertIsEmail()", () => {		
		it("Comparação com sucesso!", async () => {	
			assertion.assertIsEmail("jeandobre@gmail.com", "Emal correto!");
		});	
		
		it("Comparação com erro!", async () => {
			
			try {
				assertion.assertIsEmail("@teste", "Email incorreto!");
				expect.fail("deveria ter falhado - assertIsEmail!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Email incorreto!");
			}
		});	

		it("Comparação com nulo!", async () => {
			
			try {
				assertion.assertIsEmail(null, "Email nulo!");
				expect.fail("deveria ter falhado - assertIsEmail!");
			} catch(err) {
				expect(err).instanceOf(AssertionError);
				expect(err.message).to.eql("Email nulo!");
			}
		});	
	});
});