const db = require('../infra/db');
db().then((client) => {
	client.collections('users')
	.insert({ 
		name: 'admin', 
		email: 'root@email.com', 
		password: 'admin', 
		role: 'admin' 
	})
});
