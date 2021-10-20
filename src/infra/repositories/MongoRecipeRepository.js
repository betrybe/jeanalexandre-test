const mongo = require('mongodb');
const Recipe = require('../../domain/Recipe/Recipe');
const NotFoundObjectError = require('../../domain/common/NotFoundObjectError');

class MongoRecipeRepository {
  constructor(client) {
    this.ObjectID = mongo.ObjectID;
    this.collection = client.collection('recipes');
  }
  
  nextId() {
    return new this.ObjectID();
  }

  async save({ _id, name, ingredients, preparation, userId }) {
    const recipe = {
      _id,
      name,
      ingredients,
      preparation,
      userId,
    };
    
    await this.collection.findOneAndUpdate(
      { _id },
      { $set: recipe,
      },
      { upsert: true, returnNewDocument: true },
    );

    return recipe;
  }

  async findById(id) {
    if (!this.ObjectID.isValid(id)) {
      throw new NotFoundObjectError('recipe not found');
    }

    const item = await this.collection.findOne({ _id: this.ObjectID(id) });

    if (!item) {
      throw new NotFoundObjectError('recipe not found');
    }

    return Recipe.fromJson(item);
  }

  findAll() {
    return this.collection.find({}).toArray();
  }

  deleteById(recipeId) {
    this.collection.remove({ _id: recipeId });
  }
}

module.exports = MongoRecipeRepository;
