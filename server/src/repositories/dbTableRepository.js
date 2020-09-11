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

  getTablesIdsByDatabaseId(id) {
    return this.model.findAll({
      raw: true,
      attributes: ['id'],
      where: {
        DatabaseId: id,
      },
    });
  }

  getAllByDatabaseId(DatabaseId) {
    return this.model.findAll({ where: { DatabaseId } });
  }
}

export default new DBTableRepository(models.DBTable);
