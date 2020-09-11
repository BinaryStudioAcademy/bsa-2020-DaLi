import models from '../models/index';
import BaseRepository from './baseRepository';

class DatabaseRepository extends BaseRepository {
  findDatabaseWithCredentials(database) {
    delete database.dbNickname;
    return this.model.findOne({
      where: database,
    });
  }
}

export default new DatabaseRepository(models.Database);
