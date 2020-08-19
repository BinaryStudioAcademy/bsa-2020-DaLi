import models from '../models/index';
import BaseRepository from './baseRepository';

class DBTableRepository extends BaseRepository {}

export default new DBTableRepository(models.DBTable);
