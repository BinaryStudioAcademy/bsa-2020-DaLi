import models from '../models/index';
import BaseRepository from './baseRepository';

class PermissionCollectionsRepository extends BaseRepository {
  getPermissionsByGroupId(groupId) {
    return this.model.findAll({
      where: {
        userGroups_id: groupId,
      },
    });
  }

  updatePermissionByGroupIdAndCollectionId(collectionId, groupId, access) {
    return this.model.update(access, {
      where: {
        collections_id: collectionId,
        userGroups_id: groupId,
      },
    });
  }

  getAllWithGroupsAndCollections() {
    return this.model.findAll({
      attributes: ['id', 'permissionGranted'],

      include: [
        {
          model: models.Collection,
          as: 'collections',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: models.UserGroups,
          as: 'userGroups',
          attributes: ['id', 'name'],
        },
      ],
    });
  }
}

export default new PermissionCollectionsRepository(models.PermissionCollections);
