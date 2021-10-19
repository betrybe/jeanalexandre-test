const mongo = require('mongodb');
const NotFoundObjectError = require('../../domain/common/NotFoundObjectError');

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

  async findById(id) {
    if (!this.ObjectID.isValid(id)) {
      throw new NotFoundObjectError('recipe not found');
    }

    const item = await this.collection.findOne({ _id: this.ObjectID(id) });

    if (!item) {
      throw new NotFoundObjectError('recipe not found');
    }

    return item;
  }

  findAll() {
    return this.collection.find({}).toArray();
  }
}

module.exports = MongoRecipeRepository;
