import models from '../models/index';
import BaseRepository from './baseRepository';

class DatabaseRepository extends BaseRepository {
  getPermissions() {
    return this.model.findAll({
      attributes: [['id', 'databaseId'], 'dbNickname'],
      include: [
        {
          model: models.DBTable,
          attributes: [
            ['id', 'tableId'],
            ['name', 'tableName'],
          ],
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
        },
      ],
    });
  }

  getAllowedDatabasesByUserId(userId) {
    const result = this.model
      .findAll({
        attributes: [['id', 'databaseId']],
        // plain: true,
        // group: ['databaseId'],
        include: [
          {
            model: models.DBTable,
            attributes: [],
            include: [
              {
                model: models.Permission,
                attributes: [],
                where: {
                  permissionGranted: 'granted',
                },
                include: {
                  model: models.UserGroups,
                  attributes: [],
                  // where: { id: userId },
                  include: [
                    {
                      model: models.User,
                      attributes: [],
                      where: { id: userId },
                    },
                  ],
                },
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      })
      .then((result) => result.map((el) => el.databaseId))
      .then((result) => [...new Set(result)]);

    return result;
  }
}

export default new DatabaseRepository(models.Database);
