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
}

export default new CollectionRepository(models.Collection);
