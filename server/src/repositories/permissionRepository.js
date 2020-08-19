import models from '../models/index';
import BaseRepository from './baseRepository';

class PermissionRepository extends BaseRepository {}

export default new PermissionRepository(models.Permission);
