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

  getAllowedDatabases(userId) {
    const result = this.model
      .findAll({
        where: { id: userId },
        attributes: [],
        raw: true,
        nest: true,
        include: [
          {
            model: models.UserGroups,
            attributes: [],
            through: { attributes: [] },
            raw: true,
            nest: true,
            include: [
              {
                model: models.Permission,
                attributes: [],
                where: {
                  permissionGranted: 'granted',
                },
                include: [
                  {
                    model: models.DBTable,
                    attributes: [],
                    include: [
                      {
                        model: models.Database,
                        attributes: ['id'],
                        group: ['id'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) => result.map((el) => el.UserGroups.Permissions.DBTable.Database.id))
      .then((result) => [...new Set(result)]);
    return result;
  }

  getAllowedTables(userId) {
    const result = this.model
      .findAll({
        where: { id: userId },
        attributes: [],
        raw: true,
        nest: true,
        include: [
          {
            model: models.UserGroups,
            attributes: [],
            through: { attributes: [] },
            raw: true,
            nest: true,
            include: [
              {
                model: models.Permission,
                attributes: [],
                where: {
                  permissionGranted: 'granted',
                },
                include: [
                  {
                    model: models.DBTable,
                    attributes: ['id'],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((result) => result.map((el) => el.UserGroups.Permissions.DBTable.id))
      .then((result) => [...new Set(result)]);
    return result;
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
