import models from '../models/index';
import BaseRepository from './baseRepository';

class DatabaseRepository extends BaseRepository {
  getPermissions() {
    return this.model.findAll({
      attributes: [['id', 'databaseId'], 'dbNickname'],
      include: [
        {
          model: models.DBTable,
          // attributes: [
          //   ['userGroups_id', 'groupId'],
          //   ['permissionGranted', 'access'],
          // ],
          // include: { model: models.UserGroups, attributes: [['name', 'groupName']] },
        },
      ],
    });
  }
}

export default new DatabaseRepository(models.Database);
