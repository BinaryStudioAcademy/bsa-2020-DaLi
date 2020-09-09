import models from '../models/index';
import BaseRepository from './baseRepository';

class VisualizationRepository extends BaseRepository {
  getAllVisualizationsWithoutCollections() {
    return this.model.findAll({
      where: { collections_id: null },
    });
  }
}

export default new VisualizationRepository(models.Visualization);
