import { Op } from 'sequelize';
import models from '../models/index';
import BaseRepository from './baseRepository';
import { DEFAULT_COLLECTIONS } from '../config/types';

class CollectionRepository extends BaseRepository {
  getCollection(id) {
    return this.model
      .findAll({
        where: { id },
        include: [
          {
            model: models.Visualization,
            as: 'visualizations',
          },
          {
            model: models.Dashboard,
            as: 'dashboards',
            include: [
              {
                model: models.Visualization,
              },
            ],
          },
        ],
      })
      .then((result) => result[0]);
  }

  getDefaultCollections() {
    return this.model
      .findAll({
        where: { name: DEFAULT_COLLECTIONS },
        include: [
          {
            model: models.Visualization,
            as: 'visualizations',
          },
          {
            model: models.Dashboard,
            as: 'dashboards',
            include: [
              {
                model: models.Visualization,
              },
            ],
          },
        ],
      })
      .then((result) => result[0]);
  }

  getAllCollections(id) {
    return this.model.findAll({
      where: { [Op.or]: [{ users_id: null }, { users_id: id || null }] },
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
}
export default new CollectionRepository(models.Collection);
