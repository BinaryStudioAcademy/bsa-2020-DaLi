import { getDatabase } from '../databaseService';
import PostgresManager from './Managers/PostgresManager';

export default class DBManagerService {
  constructor(databaseId) {
    this.databaseId = databaseId;
  }

  async create() {
    const { type, host, port, dbName, username, dbPassword } = await getDatabase({ id: this.databaseId });
    let manager = null;
    if (type === 'postgres') {
      // eslint-disable-next-line no-case-declarations
      const databaseURL = `postgres:${username}:${dbPassword}@${host}:${port}/${dbName}`;
      manager = new PostgresManager(databaseURL);
    }
    return manager;
  }
}
