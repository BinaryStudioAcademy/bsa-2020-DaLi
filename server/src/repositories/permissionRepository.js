import models from '../models/index';
import BaseRepository from './baseRepository';

class PermissionRepository extends BaseRepository {
  getPermissionsByGroupId(groupId) {
    return this.model.findAll({
      where: {
        userGroups_id: groupId,
      },
    });
  }
}

export default new PermissionRepository(models.Permission);
