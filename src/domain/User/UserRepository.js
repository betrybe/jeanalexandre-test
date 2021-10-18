class UserRepository {

	constructor() {
		this._strategy = null;
	}

	set strategy(strategy) {
		this._strategy = strategy;
	}

	get strategy() {
		return this._strategy;
	}
	
	nextId() {
		return this._strategy.nextId();
	}

	save(usuario) {
		this._strategy.save(usuario);
	}

	findById(id) {
		return this._strategy.findById(id);
	}

	findByEmail(login) {
		return this._strategy.findByEmail(login);
	}
}

module.exports = UserRepository;
