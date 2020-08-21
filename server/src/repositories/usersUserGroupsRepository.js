import models from '../models/index';
import BaseRepository from './baseRepository';

class UsersUserGroupsRepository extends BaseRepository {
  getGroupsByUser(userId) {
    console.log(userId);
    return this.model.findAll({
      where: { users_id: userId },
      attributes: ['userGroups_id'],
    });
  }
}

export default new UsersUserGroupsRepository(models.UsersUserGroups);
