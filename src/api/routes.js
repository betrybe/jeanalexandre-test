const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const rescue = require('express-rescue');
const db = require('../infra/db');

const upload = multer({ dest: path.join(__dirname, '..', 'uploads') });

const UserRepository = require('../infra/repositories/MongoUserRepository');
const RecipeRepository = require('../infra/repositories/MongoRecipeRepository');
const TokenJwtService = require('../infra/services/TokenJwtService');
const UsersController = require('../controllers/Users');
const RecipesController = require('../controllers/Recipes');
const LoginController = require('../controllers/Login');

class Routes {
  constructor() {
    this.routes = Router();
  }

  connectDB() {
    db().then((client) => {
      this.userRepository = new UserRepository(client);
      this.recipeRepository = new RecipeRepository(client);
      this.tokenJwtService = new TokenJwtService();
      this.users = new UsersController(this.userRepository, this.tokenJwtService);
      this.recipes = new RecipesController(this.recipeRepository, this.tokenJwtService);
      this.login = new LoginController(this.userRepository, this.tokenJwtService);
    });
  }

  createRoutesForUsers() { 
    this.routes.route('/users')
      .post(rescue(async (req, res) => this.users.newUser(req, res)));

    this.routes.route('/users/admin')
      .post(rescue(async (req, res) => this.users.newAdminUser(req, res)));

    this.routes.route('/login')
      .post(rescue(async (req, res) => this.login.autenticate(req, res)));
  }

  createRoutesForRecipes() {
    this.routes.route('/recipes/:id')
      .get(rescue(async (req, res) => this.recipes.getOne(req, res)))
      .put(rescue(async (req, res) => this.recipes.editRecipe(req, res)))
      .delete(rescue(async (req, res) => this.recipes.deleteRecipe(req, res)));
    
    this.routes.route('/recipes')
      .get(rescue(async (req, res) => this.recipes.listAll(req, res)))
      .post(rescue(async (req, res) => this.recipes.newRecipe(req, res)));

    this.routes.route('/recipes/:id/image')
      .put(upload.single('image'), 
          rescue(async (req, res) => this.recipes.uploadImage(req, res)));
    
    this.routes.route('/images/:fileName.:ext')
      .get(rescue(async (req, res) => this.recipes.getImage(req, res)));    
  }

  createErrorRoutes() {
    this.routes.use((err, req, res, next) => {
      if (next) console.log('only for lint pass');
      return res.status(err.statusCode || 500)
        .json({ message: err.message });
    });
  }
}

const injection = new Routes();
injection.connectDB();
injection.createRoutesForUsers();
injection.createRoutesForRecipes();
injection.createErrorRoutes();

module.exports = injection.routes;
