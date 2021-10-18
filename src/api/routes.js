const { Router } = require('express');
const rescue = require('express-rescue');
const db = require('../infra/db');

const AssertionError = require('../domain/common/AssertionError');
const DuplicationError = require('../domain/common/DuplicationError');
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

    this.routes.use((err, req, res, next) => {
      if (err instanceof AssertionError) {
        return res.status(400).json({ message: err.message });
      }

      if (err instanceof DuplicationError) {
        return res.status(409).json({ message: err.message });
      }

      return res.status(500)
         .json({ error: 'i have a bad feeling about this' });
    });
  }
}

const injection = new Routes();
injection.connectDB();
injection.createRoutes();

module.exports = injection.routes;