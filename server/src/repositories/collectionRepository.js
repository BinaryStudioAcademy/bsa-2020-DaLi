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
}
export default new CollectionRepository(models.Collection);
