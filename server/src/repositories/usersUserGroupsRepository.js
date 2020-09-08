import models from '../models/index';
import BaseRepository from './baseRepository';

class UsersUserGroupsRepository extends BaseRepository {
  getGroupsByUser(userId) {
    return this.model.findAll({
      where: { users_id: userId },
      attributes: ['userGroups_id'],
      include: [
        {
          model: models.UserGroups,
          attributes: ['name', 'id'],
        },
      ],
    });
  }
}

export default new UsersUserGroupsRepository(models.UsersUserGroups);
