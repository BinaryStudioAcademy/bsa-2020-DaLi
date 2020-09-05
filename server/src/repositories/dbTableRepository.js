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

  getPermissionsByDatabaseId(DatabaseId) {
    return this.model.findAll({
      attributes: [
        ['id', 'tableId'],
        ['name', 'tableName'],
      ],
      where: { DatabaseId },
      include: [
        {
          model: models.Permission,
          attributes: [
            ['userGroups_id', 'groupId'],
            ['permissionGranted', 'access'],
          ],
          include: { model: models.UserGroups, attributes: [['name', 'groupName']] },
        },
      ],
    });
  }
}

export default new DBTableRepository(models.DBTable);
