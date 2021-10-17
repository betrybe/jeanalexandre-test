//const MongoUsuario = require('../infra/models/MongoUser');
const NewUser = require('../domain/User/NewUser');

class Users {

	constructor() {
		
	}

	newUser(req, res) {

		const { name, email, password } = req.body;	
		
		const user = new NewUser({ name, email, password });

		return res.status(201)
			.json(user.toJson())
	}
}

module.exports = Users;