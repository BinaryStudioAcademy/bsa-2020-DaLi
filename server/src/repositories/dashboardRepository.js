import models from '../models/index';
import BaseRepository from './baseRepository';

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
}

export default new DashboardRepository(models.Dashboard);
