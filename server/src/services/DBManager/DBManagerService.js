/* eslint-disable import/no-cycle */
import { getDatabase } from '../databaseService';
import PostgresManager from './Managers/PostgresManager';
import MongoManager from './Managers/MongoManager';
import MySQLManager from './Managers/MySQLManager';

export default class DBManagerService {
  constructor(database) {
    if (typeof database === 'string') {
      this.databaseId = database;
    } else if (typeof database === 'object') {
      this.database = database;
    }
  }

  async create() {
    if (this.databaseId) {
      this.database = await getDatabase({ id: this.databaseId });
    }
    const { type } = this.database;
    let manager = null;
    let databaseURL;
    switch (type) {
      case 'PostgreSQL': {
        const { host, port, dbName, username, dbPassword } = this.database;
        // eslint-disable-next-line no-case-declarations
        databaseURL = `postgres:${username}:${dbPassword}@${host}:${port}/${dbName}`;
        manager = new PostgresManager(databaseURL);
        break;
      }
      case 'MongoDB': {
        const { host, dbName, username, dbPassword } = this.database;
        databaseURL = `mongodb+srv://${username}:${dbPassword}@${host}/${dbName}`;
        manager = new MongoManager(databaseURL, dbName);
        break;
      }
      case 'MySQL': {
        const { host, port, dbName, username, dbPassword } = this.database;
        // eslint-disable-next-line no-case-declarations
        const databaseURL = `mysql:${username}:${dbPassword}@${host}:${port}/${dbName}`;
        manager = new MySQLManager(databaseURL);
        break;
      }
      default:
        throw Error('unknown type');
    }
    return manager;
  }
}
