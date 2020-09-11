import models from '../models/index';
import BaseRepository from './baseRepository';

class PermissionCollectionsRepository extends BaseRepository {
  updatePermissionByGroupIdAndCollectionId(collectionId, groupId, access) {
    return this.model.update(access, {
      where: {
        collections_id: collectionId,
        userGroups_id: groupId,
      },
    });
  }
}

export default new PermissionCollectionsRepository(models.PermissionCollections);
