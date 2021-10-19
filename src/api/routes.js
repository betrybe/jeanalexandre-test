const { Router } = require('express');
const rescue = require('express-rescue');
const db = require('../infra/db');

const AssertionError = require('../domain/common/AssertionError');
const DuplicationError = require('../domain/common/DuplicationError');
const AuthorizationError = require('../domain/common/AuthorizationError');
const NotFoundError = require('../domain/common/NotFoundError');

const UserRepository = require('../infra/repositories/MongoUserRepository');
const RecipeRepository = require('../infra/repositories/MongoRecipeRepository');
const TokenJwtService = require('../infra/services/TokenJwtService');
const UsersController = require('../controllers/Users');
const RecipesController = require('../controllers/Recipes');
const LoginController = require('../controllers/Login');

class Routes {
  connectDB() {
    db().then((client) => {
      this.userRepository = new UserRepository(client);
      this.recipeRepository = new RecipeRepository(client);
      this.tokenJwtService = new TokenJwtService();
      this.users = new UsersController(this.userRepository);
      this.recipes = new RecipesController(this.recipeRepository, this.tokenJwtService);
      this.login = new LoginController(this.userRepository, this.tokenJwtService);
    });
  }

  createRoutes() {
    this.routes = Router();
  
    this.routes.route('/users')
      .post(rescue(async (req, res) => this.users.newUser(req, res)));

    this.routes.route('/login')
      .post(rescue(async (req, res) => this.login.autenticate(req, res)));

    this.routes.route('/recipes')
      .get(rescue(async (req, res) => this.recipes.listAll(req, res)))
      .post(rescue(async (req, res) => this.recipes.newRecipe(req, res)));
    
    this.routes.route('/recipes/:id')
      .get(rescue(async (req, res) => this.recipes.getOne(req, res)));
  }

  createErrorRoutes() {
    this.routes.use((err, req, res) => {
      let status = 500;
      if (err instanceof AssertionError) status = 400; 
      if (err instanceof AuthorizationError) status = 401;
      if (err instanceof NotFoundError) status = 404;
      if (err instanceof DuplicationError) status = 409;      
      
      return res.status(status)
        .json({ message: err.message });
    });
  }
}

const injection = new Routes();
injection.connectDB();
injection.createRoutes();
injection.createErrorRoutes();

module.exports = injection.routes;