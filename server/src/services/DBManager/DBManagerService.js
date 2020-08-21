/* eslint-disable import/no-cycle */
import { getDatabase } from '../databaseService';
import PostgresManager from './Managers/PostgresManager';
import MongoManager from './Managers/MongoManager';

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
    const { type, host, port, dbName, username, dbPassword } = this.database;
    let manager = null;
    switch (type) {
      case 'postgres': {
        // eslint-disable-next-line no-case-declarations
        const databaseURL = `postgres:${username}:${dbPassword}@${host}:${port}/${dbName}`;
        manager = new PostgresManager(databaseURL);
        break;
      }
      case 'mongodb': {
        manager = new MongoManager();
        break;
      }
    }
    return manager;
  }
}
