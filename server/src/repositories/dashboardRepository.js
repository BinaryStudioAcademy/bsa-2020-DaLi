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
}

export default new DashboardRepository(models.Dashboard);
