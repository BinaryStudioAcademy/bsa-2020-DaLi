import models from '../models/index';
import BaseRepository from './baseRepository';

class DBTableRepository extends BaseRepository {
  getAllByDatabaseId(DatabaseId) {
    return this.model.findAll({ where: { DatabaseId } });
  }
}

export default new DBTableRepository(models.DBTable);
