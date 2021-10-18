const { Router } = require('express');
const rescue = require('express-rescue');
const db = require('../infra/db');

const AssertionError = require('../domain/common/AssertionError');
const UsersController = require('../controllers/Users');
const UserRepository = require('../infra/repositories/MongoUserRepository');

class Routes {
  connectDB() {
    db().then((client) => {
      this.userRepository = new UserRepository(client);
      this.users = new UsersController(this.userRepository);
    });
  }

  createRoutes() {
    this.routes = Router();
  
    this.routes.route('/users')
      .post(rescue(async (req, res) => this.users.newUser(req, res)));

    this.routes.use(rescue.from(AssertionError, (err, req, res) => {
        res.status(404)
          .json({ message: 'Invalid entries. Try again.' });
    }));
  }
}

const injection = new Routes();
injection.connectDB();
injection.createRoutes();

module.exports = injection.routes;