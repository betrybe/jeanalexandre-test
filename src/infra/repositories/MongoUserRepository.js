const mongo = require('mongodb');
const User = require('../../domain/User/User')

class MongoUserRepository {
  constructor(client) {
    this.ObjectID = mongo.ObjectID;
    this.collection = client.collection('users');
  }
  
  nextId() {
    return new this.ObjectID();
  }

  async save({ id, name, email, password, role }) {
    const user = await this.collection.findOneAndUpdate(
      { _id: id },
      { $set: {
          _id: id,
          name,
          email,
          password,
          role,
        },
      },
      { upsert: true, returnNewDocument: true },
    );

    return user;
  }

  findById(id) {
    ///
  }

  async findByEmail(email) {
    const [userMongo] = await this.collection.find({ email }).toArray();
    return User.fromJson({ ...userMongo });
  }
}

module.exports = MongoUserRepository;
