const User = require('./User');
const UserRepository = require('./UserRepository');
const Assertion = require('../common/Assertion');

class NewUser {
	constructor(strategyRepository) {
		this._assertion = new Assertion();
		this._repository = new UserRepository();
		this._repository.strategy = strategyRepository;
	}
	
	async create(newId, { 
		name,
		email,
		password
	}) {
		//await this._validDuplicatedEmail(email);

		const User = new User({
			id: newId,
			name,
			email,
			password
		});
			
		this._repository.save(User.json());
	}
/*
	async _validDuplicatedEmail(email) {
		const UserComMesmoLogin = await this._repository.buscarPorLogin(nameUser);
		this._assertion.assertFalse(UserComMesmoLogin, 
			`O name de usuário ${nameUser} já está registrado, não pode ser duplicado!`,
			'nameUser');		
	}*/
}

module.exports = NewUser;