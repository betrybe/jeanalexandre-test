const mongo = require('mongodb');
const User = require('../../domain/User/User');
const NotFoundObjectError = require('../../domain/common/NotFoundObjectError');

class MongoUserRepository {
  constructor(client) {
    this.ObjectID = mongo.ObjectID;
    this.collection = client.collection('users');
  }
  
  nextId() {
    return new this.ObjectID();
  }

  async save({ _id, name, email, password, role }) {
    const user = {
      _id,
      name,
      email,
      password,
      role,
    };
    
    await this.collection.findOneAndUpdate(
      { _id },
      { $set: user,
      },
      { upsert: true, returnNewDocument: true },
    );
  }

  async findByEmail(email) {
    const [userMongo] = await this.collection.find({ email }).toArray();
    if (!userMongo) return null;
    return User.fromJson({ ...userMongo });
  }

  async findById(id) {
    const user = await this.collection.findOne({ _id: this.ObjectID(id) });
    if (!user) {
      throw new NotFoundObjectError('recipe not found');
    }

    return User.fromJson(user);
  }
}

module.exports = MongoUserRepository;
