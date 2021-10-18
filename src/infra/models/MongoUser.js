const mongodb = require('mongodb');

const UsuarioSchema = new mongodb.Schema({
	
	name: String,
	email: String,
	password: String,
	role: String

}, {collection: "usuarios"});

module.exports = mongodb.model("usuarios", UsuarioSchema);