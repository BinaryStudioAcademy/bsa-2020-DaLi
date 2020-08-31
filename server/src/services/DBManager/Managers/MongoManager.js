import { MongoClient } from 'mongodb';
import schemaNormalizer from '../helpers/mongoDataTypeNormalizer';

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

  async getTablenames() {
    let tableNames = [];
    await this.client
      .db(this.dbName)
      .listCollections()
      .toArray()
      .then((collections) => {
        tableNames = collections.map((collection) => collection.name);
      });
    return tableNames;
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

  async getTableSchemaByName(name) {
    let collectionFields = [];

    await this.getTableDataByName(name).then((fields) => {
      collectionFields = Object.keys(fields[0]);
    });

    const tableSchema = await Promise.all(
      collectionFields.map(async (fieldName) => {
        let fieldSchema = {};
        await this.client
          .db(this.dbName)
          .collection(name)
          .aggregate([
            {
              $project: {
                type: { $type: `$${fieldName}` },
              },
            },
          ])
          .toArray()
          .then((result) => {
            fieldSchema = {
              data_type: schemaNormalizer(result[0].type),
              column_name: fieldName,
            };
          });
        return fieldSchema;
      })
    );

    return tableSchema;
  }
}
