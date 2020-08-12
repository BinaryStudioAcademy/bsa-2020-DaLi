import models from '../models/index';
import BaseRepository from './baseRepository';

class DashboardRepository extends BaseRepository {}

export default new DashboardRepository(models.Dashboard);
