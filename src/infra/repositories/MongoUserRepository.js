const mongo = require('mongodb');

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

  findByEmail(login) {
    //
  }
}

module.exports = MongoUserRepository;
