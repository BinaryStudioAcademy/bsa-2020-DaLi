import models from '../models/index';
import BaseRepository from './baseRepository';

class DashboardVisualizationsRepository extends BaseRepository {}

export default new DashboardVisualizationsRepository(models.DashboardVisualizations);
