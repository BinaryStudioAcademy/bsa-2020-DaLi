import { Op } from 'sequelize';
import models from '../models/index';
import BaseRepository from './baseRepository';
import { ACCESS_GRANTED, ACCESS_LIMITED, PRIVATE_COLLECTIONS } from '../config/types';

class DashboardRepository extends BaseRepository {
  getWithVisualizations(id) {
    return this.model.findAll({
      where: { id },
      include: [
        {
          model: models.Visualization,
        },
      ],
    });
  }

  getAllWithVisualizations() {
    return this.model.findAll({
      include: [
        {
          model: models.Visualization,
        },
      ],
    });
  }

  getAllDashboardsWithoutCollections() {
    return this.model.findAll({
      where: { collections_id: null },
    });
  }

  getDashboardAccess(id, userId) {
    return this.model
      .findOne({
        attributes: [],
        where: { id },
        include: [
          {
            model: models.Collection,
            attributes: ['id'],
            include: [
              {
                model: models.PermissionCollections,
                attributes: ['permissionGranted'],
                where: {
                  [Op.or]: [{ permissionGranted: ACCESS_GRANTED }, { permissionGranted: ACCESS_LIMITED }],
                },
                include: [
                  {
                    model: models.UserGroups,
                    as: 'userGroups',
                    attributes: ['id'],
                    include: [
                      {
                        model: models.User,
                        where: { id: userId },
                        attributes: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) => {
        if (result.Collection !== null) {
          return result.Collection.PermissionCollections.map((accessType) => {
            return accessType.userGroups !== null ? accessType.permissionGranted : null;
          });
        }
        return PRIVATE_COLLECTIONS;
      });
  }
}

export default new DashboardRepository(models.Dashboard);
