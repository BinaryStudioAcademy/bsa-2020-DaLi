import models from '../models/index';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getAllowedDatabases(userId) {
    const result = this.model
      .findAll({
        where: { id: userId },
        attributes: [],
        raw: true,
        nest: true,
        include: [
          {
            model: models.UserGroups,
            attributes: [],
            through: { attributes: [] },
            raw: true,
            nest: true,
            include: [
              {
                model: models.Permission,
                attributes: [],
                where: {
                  permissionGranted: 'granted',
                },
                include: [
                  {
                    model: models.DBTable,
                    attributes: [],
                    include: [
                      {
                        model: models.Database,
                        attributes: ['id'],
                        group: ['id'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) => result.map((el) => el.UserGroups.Permissions.DBTable.Database.id))
      .then((result) => [...new Set(result)]);
    return result;
  }
}

export default new UserRepository(models.User);
