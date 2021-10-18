const mongo = require('mongodb');
const Recipe = require('../../domain/Recipe/Recipe');

class MongoRecipeRepository {
  constructor(client) {
    this.ObjectID = mongo.ObjectID;
    this.collection = client.collection('recipes');
  }
  
  nextId() {
    return new this.ObjectID();
  }

  async save({ id, name, ingredients, preparation, userId }) {
    const recipe = {
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    };
    
    await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: recipe,
      },
      { upsert: true, returnNewDocument: true },
    );

    return recipe;
  }

  findById(id) {
    ///
  }
}

module.exports = MongoRecipeRepository;
