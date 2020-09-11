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

  updatePermissionByGroupIdAndTableId(groupId, tableId, access) {
    return this.model.update(access, {
      where: {
        userGroups_id: groupId,
        dbtable_id: tableId,
      },
    });
  }
}

export default new PermissionRepository(models.Permission);
