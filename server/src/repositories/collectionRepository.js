import models from '../models/index';
import BaseRepository from './baseRepository';

class CollectionRepository extends BaseRepository {
  getWithDashboardsAndVisualizations(id) {
    return this.model.findAll({
      where: { id },
      include: [
        {
          model: models.Visualization,
        },
        {
          model: models.Dashboard,
        },
      ],
    });
  }

  getAllWithDashboardsAndVisualizations() {
    return this.model.findAll({
      include: [
        {
          model: models.Visualization,
        },
        {
          model: models.Dashboard,
        },
      ],
    });
  }

  getInitialCollectionId() {
    return this.model
      .findAll({
        where: { name: 'Our analytics' },
        attributes: ['id'],
      })
      .then((result) => result[0].id);
  }

  getAllWithGroupsPermission() {
    return this.model
      .findAll({
        attributes: ['id', 'name', 'description'],

        include: [
          {
            model: models.PermissionCollections,
            attributes: ['permissionGranted'],
            include: [
              {
                model: models.UserGroups,
                as: 'userGroups',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      })
      .then((result) =>
        result.map((collection) => {
          const groups = collection.PermissionCollections.map((group) => {
            return {
              id: group.userGroups.id,
              name: group.userGroups.name,
              access: group.permissionGranted,
            };
          });
          return {
            id: collection.id,
            name: collection.name,
            description: collection.description,
            groups,
          };
        })
      );
  }

  getCollectionWithGroupsPermission(id) {
    return this.model
      .findOne({
        where: { id },
        attributes: ['id', 'name', 'description'],

        include: [
          {
            model: models.PermissionCollections,
            attributes: ['permissionGranted'],
            include: [
              {
                model: models.UserGroups,
                as: 'userGroups',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      })
      .then((result) => {
        const groups = result.PermissionCollections.map((group) => {
          return {
            id: group.userGroups.id,
            name: group.userGroups.name,
            access: group.permissionGranted,
          };
        });
        return {
          id: result.id,
          name: result.name,
          description: result.description,
          groups,
        };
      });
  }
}
export default new CollectionRepository(models.Collection);
