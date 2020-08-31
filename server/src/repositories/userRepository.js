import models from '../models/index';
import BaseRepository from './baseRepository';
import UserGroupsRepository from './userGroupsRepository';
import UsersUserGroupsRepository from './usersUserGroupsRepository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getUserById(id) {
    return this.model.findOne({ where: { id } });
  }

  async createUsersWithDefaultGroups(user) {
    const allGroups = await UserGroupsRepository.getAll();
    const allUsersGroupID = allGroups.filter((group) => group.name === 'All Users')[0].id;
    const allUserGroup = await UserGroupsRepository.getWithUsers(allUsersGroupID);
    const userCount = allUserGroup[0].Users.length;
    const result = await this.model.create(user);
    await UsersUserGroupsRepository.create({ users_id: result.id, userGroups_id: allUsersGroupID });
    if (!userCount) {
      const AdminGroupID = allGroups.filter((group) => group.name === 'Administrators')[0].id;
      await UsersUserGroupsRepository.create({ users_id: result.id, userGroups_id: AdminGroupID });
    }
    return result;
  }
}

export default new UserRepository(models.User);
