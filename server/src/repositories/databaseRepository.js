import models from '../models/index';
import BaseRepository from './baseRepository';

class DatabaseRepository extends BaseRepository {}

export default new DatabaseRepository(models.Database);
