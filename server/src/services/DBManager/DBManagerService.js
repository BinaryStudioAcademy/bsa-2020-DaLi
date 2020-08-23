/* eslint-disable import/no-cycle */
import { getDatabase } from '../databaseService';
import PostgresManager from './Managers/PostgresManager';
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
    const { type, host, port, dbName, username, dbPassword } = this.database;
    let manager = null;
    switch (type) {
      case 'PostgreSQL': {
        // eslint-disable-next-line no-case-declarations
        const databaseURL = `postgres:${username}:${dbPassword}@${host}:${port}/${dbName}`;
        manager = new PostgresManager(databaseURL);
        break;
      }
      case 'MySQL': {
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
