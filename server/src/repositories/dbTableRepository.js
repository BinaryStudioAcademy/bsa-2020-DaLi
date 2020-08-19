import models from '../models/index';
import BaseRepository from './baseRepository';

class DBTableRepository extends BaseRepository {
  getTablesByDatabaseId({ id }) {
    return this.model.findAll({
      where: {
        DatabaseId: id,
      },
    });
  }
}

export default new DBTableRepository(models.DBTable);
