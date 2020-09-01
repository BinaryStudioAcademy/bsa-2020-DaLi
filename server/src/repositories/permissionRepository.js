import models from '../models/index';
import BaseRepository from './baseRepository';
import { TABLE } from '../config/types';

class PermissionRepository extends BaseRepository {
  getPermissionsByGroupId(groupId) {
    return this.model.findAll({
      where: {
        userGroups_id: groupId,
      },
    });
  }

  getTablesPermissions() {
    return this.model.findAll({
      where: {
        type: TABLE,
      },
    });
  }

  updatePermissionByGroupIdAndTableId(groupId, tableId, access) {
    return this.model.update(access, {
      where: {
        userGroups_id: groupId,
        dbtable_id: tableId,
        type: TABLE,
      },
    });
  }
}

export default new PermissionRepository(models.Permission);
