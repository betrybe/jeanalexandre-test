const { Router } = require('express');
const rescue = require('express-rescue');
const AssertionError = require('../domain/common/AssertionError');

const UsersController = require('../controllers/Users');

const routes = Router();
const users = new UsersController();

routes.route('/users')
  .post(rescue(async (req, res) => users.newUser(req, res)));

routes.use(rescue.from(AssertionError, (err, req, res) => {
    res.status(404)
       .json({ message: 'Invalid entries. Try again.' });
}));

module.exports = routes;