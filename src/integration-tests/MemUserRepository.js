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

module.exports = MemUserRepository;