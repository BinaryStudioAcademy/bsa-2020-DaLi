import { MongoClient } from 'mongodb';

export default class DBMongoManager {
  constructor(databaseURL, dbName) {
    this.client = new MongoClient(databaseURL, {
      useNewUrlParser: true,
    });
    this.dbName = dbName;
  }

  async init() {
    await this.client.connect();
  }

  destroy() {
    return this.client.close();
  }

  getTablenames() {
    const collectionList = this.client.db(this.dbName).listCollections();
    return collectionList.map((collection) => collection.name);
  }

  async getTableDataByName(name) {
    let collectionFields = [];
    await this.client
      .db(this.dbName)
      .collection(name)
      .find({})
      .toArray()
      .then((fields) => {
        collectionFields = fields;
      });
    return collectionFields;
  }
}
