const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';

async function mongoConnection() {
  const connection = await MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected successfully to mongodb server');

  return connection.db('Cookmaster');
}

module.exports = mongoConnection;